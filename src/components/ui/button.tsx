import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | ReactNode[];
  onlyIcon?: boolean;
  variant?: "primary" | "secondary";
}

export function Button({
  children,
  onlyIcon,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx({
        "cursor-pointer duration-200 flex gap-4 items-center justify-center py-2.5 px-5 text-sm font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.25)] rounded-4xl border-none":
          true,
        [`${props.className}`]: props.className,
        "text-neutral-800 hover:bg-neutral-800 stroke-[#333333] hover:stroke-white hover:text-neutral-50 bg-neutral-50":
          variant === "primary",
        "text-neutral-50 hover:bg-neutral-50 hover:stroke-[#333333] stroke-white hover:text-neutral-800 bg-neutral-800":
          variant === "secondary",
        "rounded-full py-2! px-2!": onlyIcon,
      })}
    >
      {children}
    </button>
  );
}
