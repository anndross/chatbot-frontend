import clsx from "clsx";
import { MessageVariant } from ".";

interface MessageNameProps {
  variant: MessageVariant;
}

export function MessageName({ variant }: MessageNameProps) {
  const name: Record<Exclude<MessageVariant, "loading">, string> = {
    user: "Eu",
    bot: "AlfredBot",
  };

  const isLoading = variant === "loading";

  return (
    <span
      className={clsx({
        "text-base text-neutral-700 mb-2 font-medium": true,
        "justify-self-start": variant === "bot",
        "justify-self-end": variant === "user",
      })}
    >
      {!isLoading && name[variant]}
    </span>
  );
}
