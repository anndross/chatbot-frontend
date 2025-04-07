import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { MessageWrapper } from "@/chat/components/conversation/message/wrapper";
import clsx from "clsx";
import { handleSendRating } from "@/services/handleSendRating";
import { MessageName } from "@/chat/components/conversation/message/name";
import { MessageTime } from "@/chat/components/conversation/message/time";
import { useChat } from "@/chat/context";
import { Message } from "@/types/chatbot";
import { useAddAnimatedMessage } from "@/hooks/addAnimatedMessage";
import { v4 as uuidv4 } from "uuid";

export interface AnswerRatingProps {
  data: Message;
}

export function AnswerRating({ data }: AnswerRatingProps) {
  const {
    chatbot: { loadingMessage, messages },
  } = useChat();

  const [like, setLike] = useState<null | boolean>(null);

  const addAnimatedResponse = useAddAnimatedMessage();

  useEffect(() => {
    if (like === null) return;

    handleSendRating(data.value, like ? "Sim" : "Não");

    addAnimatedResponse({
      id: uuidv4(),
      value: "Obrigado pela sua avaliação! Ela é muito importante para nós. 🥰",
      time: new Date(),
      type: "bot",
    });
  }, [like]);

  return (
    <div
      className={clsx({
        "w-fit grid justify-self-start": true,
      })}
    >
      {messages[messages.length - 1]?.type === "user" && (
        <MessageName variant="bot" />
      )}

      <MessageWrapper variant="bot">
        {data.value}

        <div
          className={clsx("flex gap-5 mt-4 duration-1000", {
            "opacity-0": loadingMessage && data.value,
            "opacity-100": !loadingMessage && data.value,
          })}
        >
          <Button
            disabled={like !== null}
            className={clsx("rounded-sm border border-primary border-solid", {
              "bg-secondary text-primary!": like === true,
            })}
            onClick={() => setLike(true)}
          >
            Sim
          </Button>
          <Button
            disabled={like !== null}
            className={clsx(
              "rounded-sm hover:border hover:border-primary hover:border-solid",
              { "bg-secondary text-primary!": like === false }
            )}
            onClick={() => setLike(false)}
          >
            Não
          </Button>
        </div>
      </MessageWrapper>

      <MessageTime time={new Date()} variant="bot" />
    </div>
  );
}
