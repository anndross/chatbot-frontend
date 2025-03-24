import clsx from "clsx";
import { ComponentProps } from "react";

export interface SeparatorProps {
  className?: ComponentProps<"div">["className"];
}

export function Separator({ className }: SeparatorProps) {
  return (
    <hr
      className={clsx({
        "border-neutral-400 w-full border": true,
        [`${className}`]: className,
      })}
    />
  );
}
