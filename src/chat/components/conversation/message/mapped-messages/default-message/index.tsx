import { Loading } from "@/components/ui/loading";
import clsx from "clsx";
import { Markup } from "interweave";
import { MessageContainer } from "../../container";
import { MessageTime } from "../../time";
import { MessageName } from "../../name";
import { MessageProps } from "../..";
import { useChat } from "@/chat/context";

export function DefaultMessage({ data, variant }: MessageProps) {
  const {
    chatbot: { loadingMessage, messages },
  } = useChat();

  const { value: text, time } = data || {};
  const isLoading = !text?.length && loadingMessage;

  const indexOfCurrentMessage = messages.findIndex(
    (msg) => msg.id === data?.id
  );

  return (
    <div className="w-full grid">
      <div
        className={clsx({
          "w-fit grid": true,
          "justify-self-start": variant === "bot",
          "justify-self-end": variant === "user",
        })}
      >
        {!isLoading &&
          messages[indexOfCurrentMessage - 1]?.type !== variant && (
            <MessageName variant={variant} />
          )}

        <MessageContainer variant={variant}>
          {isLoading ? <Loading /> : <Markup content={text} />}
        </MessageContainer>

        {!isLoading && <MessageTime time={time} variant={variant} />}
      </div>
    </div>
  );
}
