import clsx from "clsx";
import dayjs from "dayjs";
import { MessageVariant } from ".";

interface MessageTimeProps {
  time?: Date;
  variant: MessageVariant;
}

export function MessageTime({ time, variant }: MessageTimeProps) {
  return (
    <>
      {time && (
        <span
          className={clsx({
            "text-[10px] text-neutral-500 mb-2.5": true,
            "justify-self-end": variant === "bot",
            "justify-self-start": variant === "user",
          })}
        >
          {dayjs(time).format("HH:mm")}
        </span>
      )}
    </>
  );
}
