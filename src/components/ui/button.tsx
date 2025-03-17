import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | ReactNode[];
}
export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx({
        "text-neutral-800 hover:bg-neutral-800 stroke-[#333333] hover:stroke-white hover:text-neutral-50 cursor-pointer duration-200 flex gap-4 items-center justify-center py-2.5 px-5 fixed bottom-5 right-5 text-sm font-semibold bg-neutral-50 shadow-[0_2px_8px_rgba(0,0,0,0.25)] rounded-4xl border-none":
          true,
        [`${props.className}`]: props.className,
      })}
    >
      {children}
    </button>
  );
}
