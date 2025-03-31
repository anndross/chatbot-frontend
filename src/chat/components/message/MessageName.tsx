import clsx from "clsx";
import { MessageVariant } from "@/chat/components/message";

export interface MessageNameProps {
  variant: Exclude<MessageVariant, "loading">;
}

export function MessageName({ variant }: MessageNameProps) {
  const name: Record<Exclude<MessageVariant, "loading">, string> = {
    user: "Eu",
    bot: "AlfredBot",
  };

  return (
    <span
      className={clsx({
        "text-base text-neutral-700 mb-2 font-medium": true,
        "justify-self-start": variant === "bot",
        "justify-self-end": variant === "user",
      })}
    >
      {name[variant]}
    </span>
  );
}
