'use client';

import * as React from 'react';

import { useIsInView } from '@/hooks/use-is-in-view';

const CodeBlock = React.forwardRef(function CodeBlock(
  {
    code,
    lang,
    theme = 'light',
    themes = {
      // prefer VS Code themes for better parity with VS Code Dark+ UI
      light: 'vscode-light',
      dark: 'vscode-dark-plus',
    },
    writing = false,
    // when true, typing proceeds line-by-line instead of character-by-character
    writeByLine = false,
    // precise control: ms per character override (if provided)
    charInterval, // number (ms)
    // alternative: characters per second (higher = faster)
    speed, // number (chars/second)
    // add humanized typing (random jitter) for a natural feel
    humanize = true,
    // max jitter in ms applied when humanize=true
    jitter = 40,
    // character to use for typing cursor
    cursorChar = '▍',
    duration = 5000,
    delay = 0,
    onDone,
    onWrite,
    scrollContainerRef,
    inView = false,
    inViewOnce = true,
    inViewMargin = '0px',
    ...props
  },
  ref,
) {
  const { ref: localRef, isInView } = useIsInView(ref, {
    inView,
    inViewOnce,
    inViewMargin,
  });

  const [visibleCode, setVisibleCode] = React.useState('');
  const [highlightedCode, setHighlightedCode] = React.useState('');
  const [isDone, setIsDone] = React.useState(false);

  React.useEffect(() => {
    if (!visibleCode.length || !isInView) return;

    // helper: escape html so we can show raw text while typing
    const escapeHtml = (str) =>
      str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    const loadHighlightedCode = async () => {
      // while we're actively writing and not finished, show the raw typed characters
      // escaped with a blinking cursor so the UI updates per character immediately.
      if (writing && !isDone) {
        setHighlightedCode(`<pre class="shiki"><code>${escapeHtml(
          visibleCode,
        )}<span class="typing-cursor">${escapeHtml(cursorChar)}</span></code></pre>`);
        return;
      }
      try {
        const { codeToHtml } = await import('shiki');

        let highlighted = await codeToHtml(visibleCode, {
          lang,
          themes,
          defaultColor: theme,
        });

        // Remove inline color/background declarations so the UI can control
        // foreground/background (user requested transparent background + white text).
        const stripColorBackgroundFromStyle = (html) =>
          html.replace(/style="([^"]*)"/gi, (match, styles) => {
            // Remove only color and background declarations from style attribute
            const cleaned = styles
              .replace(/(?:^|;)\s*(?:color:[^;]+)\s*;?/gi, '')
              .replace(/(?:^|;)\s*(?:background(?:-color)?:[^;]+)\s*;?/gi, '')
              .trim();
            return cleaned ? `style="${cleaned}"` : '';
          });

        highlighted = stripColorBackgroundFromStyle(highlighted);

        setHighlightedCode(highlighted);
      } catch (e) {
        console.error(`Language "${lang}" could not be loaded.`, e);
      }
    };

    loadHighlightedCode();
  }, [lang, themes, writing, isInView, duration, delay, visibleCode, theme]);

  React.useEffect(() => {
    if (!writing) {
      setVisibleCode(code);
        onDone?.();
        if (writeByLine) {
          const lines = code.length ? code.split(/\r?\n/) : [];
          onWrite?.({ index: lines.length, length: lines.length, done: true });
        } else {
          onWrite?.({ index: code.length, length: code.length, done: true });
        }
      return;
    }

    if (!code.length || !isInView) return;

    const totalDuration = duration;

    // helper to compute base delay per step
    const getBaseDelay = (count) => {
      if (charInterval != null) return Math.max(1, charInterval);
      if (speed != null && speed > 0) return Math.max(1, Math.floor(1000 / speed));
      // fallback: divide total duration across items (characters or lines)
      // fallback: divide total duration across items (characters or lines)
      return count ? Math.max(1, Math.floor(totalDuration / count)) : totalDuration;
    };

    if (writeByLine) {
      const lines = code.split(/\r?\n/);
      let index = 0;
      const base = getBaseDelay(lines.length);
      let timeoutId;

      const scheduleLine = () => {
        if (index < lines.length) {
          setVisibleCode(() => {
            const next = lines.slice(0, index + 1).join('\n');
            onWrite?.({ index: index + 1, length: lines.length, done: false });
            index += 1;
            return next;
          });
          localRef.current?.scrollTo({
            top: localRef.current?.scrollHeight,
            behavior: 'smooth',
          });

          let nextDelay = base;
          if (humanize) {
            nextDelay = Math.max(10, base + Math.floor((Math.random() * 2 - 1) * jitter));
          }
          timeoutId = setTimeout(scheduleLine, nextDelay);
        } else {
          setIsDone(true);
          onDone?.();
          onWrite?.({ index: lines.length, length: lines.length, done: true });
        }
      };

      timeoutId = setTimeout(scheduleLine, delay);

      return () => {
        clearTimeout(timeoutId);
      };
    }

    // fallback: character-by-character
    // character-by-character with optional humanized intervals
    const characters = Array.from(code);
    let index = 0;
    let timeoutId;

    const base = getBaseDelay(characters.length);

    const scheduleChar = () => {
      if (index < characters.length) {
        setVisibleCode(() => {
          const nextChar = characters.slice(0, index + 1).join('');
          onWrite?.({ index: index + 1, length: characters.length, done: false });
          index += 1;
          return nextChar;
        });
        localRef.current?.scrollTo({
          top: localRef.current?.scrollHeight,
          behavior: 'smooth',
        });

        let nextDelay = base;
        if (humanize) nextDelay = Math.max(10, base + Math.floor((Math.random() * 2 - 1) * jitter));
        timeoutId = setTimeout(scheduleChar, nextDelay);
      } else {
        setIsDone(true);
        onDone?.();
        onWrite?.({ index: characters.length, length: characters.length, done: true });
      }
    };

    timeoutId = setTimeout(scheduleChar, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [code, duration, delay, isInView, writing, onDone, onWrite, localRef]);

  React.useEffect(() => {
    if (!writing || !isInView) return;
    const el =
      scrollContainerRef?.current ??
      (localRef.current?.parentElement) ?? localRef.current;

    if (!el) return;

    requestAnimationFrame(() => {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: 'smooth',
      });
    });
  }, [highlightedCode, writing, isInView, scrollContainerRef, localRef]);

  return (
    <div
      ref={localRef}
      data-slot="code-block"
      data-writing={writing}
      data-done={isDone}
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
      {...props}
    />
  );
});

export { CodeBlock };