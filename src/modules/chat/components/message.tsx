import clsx from "clsx";
import dayjs from "dayjs";
import { Laoding } from "../../../components/ui/loading";
import { Markup } from "interweave";

interface MessageProps {
  variant: "user" | "bot" | "loading";
  text?: string;
  time?: Date;
}

export function Message({ variant, text, time }: MessageProps) {
  const name: Record<Exclude<MessageProps["variant"], "loading">, string> = {
    user: "Eu",
    bot: "AlfredBot",
  };

  const isLoading = variant === "loading";
  return (
    <div className="w-full grid">
      <div
        className={clsx({
          "w-fit grid": true,
          "justify-self-start": variant === "bot",
          "justify-self-end": variant === "user",
        })}
      >
        <span
          className={clsx({
            "text-base text-neutral-700 mb-2.5 font-medium": true,
            "justify-self-start": variant === "bot",
            "justify-self-end": variant === "user",
          })}
        >
          {!isLoading && name[variant]}
        </span>

        <div
          className={clsx({
            "text-neutral-50 rounded-3xl px-6 py-5": true,
            "bg-neutral-700 rounded-tl-lg": variant === "bot" || isLoading,
            "bg-neutral-400 rounded-tr-lg": variant === "user",
          })}
        >
          {isLoading ? <Laoding /> : <Markup content={text} />}
        </div>

        {time && (
          <span
            className={clsx({
              "text-xs text-neutral-500 mb-2.5": true,
              "justify-self-end": variant === "bot",
              "justify-self-start": variant === "user",
            })}
          >
            {dayjs(time).format("HH:mm")}
          </span>
        )}
      </div>
    </div>
  );
}
