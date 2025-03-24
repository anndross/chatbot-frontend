import clsx from "clsx";
import { Markup } from "interweave";
import { Message as MessageType } from "../../../types/chatbot";
import { MessageWrapper } from "./MessageWrapper";
import { MessageTime } from "./MessageTime";
import { MessageName } from "./MessageName";
import { MessageActions } from "./MessageActions";

export type MessageVariant = "user" | "bot" | "loading";

export interface MessageProps {
  variant: MessageVariant;
  data?: Omit<MessageType, "type">;
}

export function Message({ variant, data }: MessageProps) {
  const { value: text, time, actions } = data || {};

  const isLoading = variant === "loading";

  return (
    <>
      <div className="w-full grid mb-6">
        <div
          className={clsx({
            "w-fit grid": true,
            "justify-self-start": variant === "bot",
            "justify-self-end": variant === "user",
          })}
        >
          {!isLoading && <MessageName variant={variant} />}

          <MessageWrapper variant={variant}>
            <Markup content={text} />
          </MessageWrapper>

          {!isLoading && <MessageTime time={time} variant={variant} />}
        </div>
      </div>
      {actions && <MessageActions actions={actions} />}
    </>
  );
}
