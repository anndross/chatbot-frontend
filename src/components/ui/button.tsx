import clsx from "clsx";
import { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | ReactNode[];
  onlyIcon?: boolean;
  variant?: "primary" | "secondary";
}

type StylesOptions = "default" | "primary" | "secondary" | "icon";

export function Button({
  children,
  onlyIcon,
  variant = "primary",
  ...props
}: ButtonProps) {
  const styles: Record<StylesOptions, ComponentProps<"div">["className"]> = {
    default:
      "cursor-pointer duration-200 flex gap-4 items-center justify-center py-2.5 px-5 text-sm font-semibold button-shadow rounded-4xl border-none",
    primary: "text-secondary hover:bg-secondary hover:text-primary bg-primary",
    secondary:
      "text-primary hover:bg-primary hover:text-secondary bg-secondary",
    icon: "rounded-full py-2! px-2! duration-150 hover:scale-110 hover:opacity-90",
  };
  console.log("props.className", props.className);
  return (
    <button
      {...props}
      className={clsx({
        [`${styles.default}`]: styles["default"],
        [`${styles.primary}`]: variant === "primary",
        [`${styles.secondary}`]: variant === "secondary",
        [`${styles.icon} hover:bg-primary!`]: variant === "primary" && onlyIcon,
        [`${styles.icon} hover:bg-secondary!`]:
          variant === "secondary" && onlyIcon,
        [`${props.className}`]: props.className,
      })}
    >
      {children}
    </button>
  );
}
