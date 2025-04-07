import clsx from "clsx";
import { ReactNode } from "react";
import { MessageVariant } from "@/chat/components/conversation/message";

export interface MessageWapperProps {
  variant: MessageVariant;
  children: ReactNode | ReactNode[];
}

export function MessageWrapper({ variant, children }: MessageWapperProps) {
  return (
    <div
      className={clsx({
        "w-fit h-fit text-white rounded-3xl px-6 py-[19.5px] text-sm mb-1 max-w-80 leading-[18px]":
          true,
        "bg-secondary rounded-tl-lg": variant === "bot",
        "bg-tertiary rounded-tr-lg": variant === "user",
      })}
    >
      {children}
    </div>
  );
}
