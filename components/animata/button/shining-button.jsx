import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export default function ShiningButton() {
  const label = "Resume";
  return (
    <a href="/files/Abhiram S Manoj MERN .pdf" download={true}>
      <button className="group cursor-pointer rounded-xl border-2 border-gray-700 border-opacity-0 bg-transparent p-1 transition-all duration-500 hover:border-opacity-100">
        <div className="relative flex items-center justify-center gap-4 overflow-hidden rounded-lg bg-gray-700 px-3 py-2 font-bold text-white">
          {label}
          <ArrowRight className="transition-all group-hover:translate-x-2 group-hover:scale-125" />
          <div
            className={cn(
              "absolute -left-16 top-0 h-full w-12 rotate-30 scale-y-150 bg-white/10 transition-all duration-700 group-hover:left-[calc(100%+1rem)]",
            )}
          />
        </div>
      </button>
    </a>
  );
}
