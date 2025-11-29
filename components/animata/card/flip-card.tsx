import { cn } from "../../../src/lib/utils";

interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  description: string;
  link: string;
  rotate?: "x" | "y";
}

export default function FlipCard({
  image,
  title,
  description,
  link,
  rotate = "y",
  className,
  ...props
}: FlipCardProps) {
  const rotationClass = {
    x: ["group-hover:[transform:rotateX(180deg)]", "[transform:rotateX(180deg)]"],
    y: ["group-hover:[transform:rotateY(180deg)]", "[transform:rotateY(180deg)]"],
  };
  const self = rotationClass[rotate];

  return (
    <div className={cn("group h-60 w-72 perspective-[1000px]", className)} {...props}>
      <div
        className={cn(
          "relative h-full rounded-2xl transition-all duration-500 transform-3d",
          self[0],
        )}
      >
        {/* Front */}
        <div className="absolute h-full w-full backface-hidden">
          <img
            src={image}
            alt="image"
            className="h-full w-full rounded-2xl object-cover shadow-2xl shadow-black/40"
          />
          <div className="absolute bottom-4 left-4 text-xl font-bold text-white">{title}</div>
        </div>

        {/* Back */}
        <div
          className={cn(
            "absolute h-full w-full rounded-2xl bg-black/80 p-4 text-slate-200 backface-hidden",
            self[1],
          )}
        >
          <div className="flex min-h-full flex-col gap-2">
            <p className="mt-1 py-4 text-base font-medium leading-normal text-gray-100">
              {description}{" "}
            </p>
            <a href={link} target="_blank" className="text-xl font-bold text-white cursor-pointer hover:underline">View-</a>
          </div>
        </div>
      </div>
    </div>
  );
}
