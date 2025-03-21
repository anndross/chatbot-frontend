import clsx from "clsx";
import { ComponentProps } from "react";

interface SeparatorProps {
  className?: ComponentProps<"div">["className"];
}

export function Separator({ className }: SeparatorProps) {
  return (
    <hr
      className={clsx({
        "border-neutral-400": true,
        [`${className}`]: className,
      })}
    />
  );
}
