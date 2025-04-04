import clsx from "clsx";
import { Markup } from "interweave";
import { Message as MessageType } from "@/types/chatbot";
import { MessageWrapper } from "@/chat/components/message/MessageWrapper";
import { MessageTime } from "@/chat/components/message/MessageTime";
import { MessageName } from "@/chat/components/message/MessageName";
import { MessageActions } from "@/chat/components/message/MessageActions";
import { Loading } from "@/components/ui/loading";
import { useChat } from "@/chat/context";
import { AnswerEvaluation } from "./MessageActions/AnswerEvaluation";

export type MessageVariant = "user" | "bot";

export interface MessageProps {
  variant: MessageVariant;
  data?: Omit<MessageType, "type">;
}

export function Message({ variant, data }: MessageProps) {
  const {
    chatbot: { loadingMessage },
  } = useChat();

  const { value: text, time, actions } = data || {};

  const isLoading = !text?.length && loadingMessage;

  return (
    <>
      {(!!text?.length || loadingMessage) && (
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
                {isLoading ? <Loading /> : <Markup content={text} />}
              </MessageWrapper>

              {!isLoading && <MessageTime time={time} variant={variant} />}
            </div>
          </div>
          {actions && <MessageActions actions={actions} />}
        </>
      )}
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
            Gostou da interação com o chat?
            <AnswerEvaluation data={{ ...data, type: variant }} />
          </MessageWrapper>

          {!isLoading && <MessageTime time={time} variant={variant} />}
        </div>
      </div>
    </>
  );
}
