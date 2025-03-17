import clsx from "clsx";

interface MessageProps {
  variant: "user" | "bot";
  text: string;
}

export function Message({ variant, text }: MessageProps) {
  return (
    <div
      className={clsx({
        "text-neutral-50 rounded-3xl px-6 py-5": true,
        "bg-neutral-800 rounded-tl-lg": variant === "bot",
        "bg-neutral-400 rounded-tr-lg": variant === "user",
      })}
    >
      {text}
    </div>
  );
}
