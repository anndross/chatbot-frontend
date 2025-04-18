import clsx from "clsx";
import { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | ReactNode[];
  onlyIcon?: boolean;
  variant?: "primary" | "secondary" | "disabled";
}

export function Button({
  children,
  onlyIcon,
  variant = "primary",
  ...props
}: ButtonProps) {
  const styles: Record<
    typeof variant | "icon",
    ComponentProps<"div">["className"]
  > = {
    primary: "text-secondary hover:bg-secondary hover:text-primary bg-primary",
    secondary:
      "text-primary hover:bg-primary hover:text-secondary bg-secondary",
    icon: "rounded-full aspect-square py-2! px-2! duration-150 hover:scale-110 hover:opacity-90",
    disabled: "opacity-50 cursor-not-allowed",
  };

  return (
    <button
      {...props}
      className={clsx(
        "cursor-pointer duration-200 flex gap-4 items-center justify-center py-2.5 px-5 text-sm font-semibold button-shadow rounded-4xl border-none",
        {
          [`${styles.primary}`]: variant === "primary",
          [`${styles.secondary}`]: variant === "secondary",
          [`${styles.icon} hover:bg-primary! text-secondary!`]:
            variant === "primary" && onlyIcon,
          [`${styles.icon} hover:bg-secondary! text-primary!`]:
            variant === "secondary" && onlyIcon,
          [`${props.className}`]: props.className,
          [`${styles.disabled}`]: props.disabled || variant === "disabled",
        }
      )}
    >
      {children}
    </button>
  );
}
