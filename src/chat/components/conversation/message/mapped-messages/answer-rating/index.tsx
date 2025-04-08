import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { MessageContainer } from "@/chat/components/conversation/message/container";
import clsx from "clsx";
import { handleSendRating } from "@/services/handleSendRating";
import { MessageName } from "@/chat/components/conversation/message/name";
import { MessageTime } from "@/chat/components/conversation/message/time";
import { useChat } from "@/chat/context";
import { Message } from "@/types/chatbot";
import { useAddAnimatedMessage } from "@/hooks/addAnimatedMessage";
import { v4 as uuidv4 } from "uuid";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";

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

      <MessageContainer variant="bot">
        {data.value}

        <div
          className={clsx("flex gap-5 mt-4 duration-1000", {
            "opacity-0": loadingMessage && data.value,
            "opacity-100": !loadingMessage && data.value,
          })}
        >
          <Button
            disabled={like !== null}
            className={clsx(
              "bg-transparent! shadow-none! hover:bg-transparent!"
            )}
            onClick={() => setLike(true)}
          >
            <BiLike
              width={32}
              height={32}
              className={clsx(
                "duration-100 text-xl fill-primary hover:fill-tertiary",
                {
                  "fill-tertiary!": like === true,
                }
              )}
            />
          </Button>
          <Button
            disabled={like !== null}
            className={clsx(
              "bg-transparent! shadow-none! hover:bg-transparent!"
            )}
            onClick={() => setLike(false)}
          >
            <BiDislike
              width={32}
              height={32}
              className={clsx(
                "duration-100 text-xl fill-primary hover:fill-tertiary",
                {
                  "fill-tertiary!": like === false,
                }
              )}
            />
          </Button>
        </div>
      </MessageContainer>

      <MessageTime time={new Date()} variant="bot" />
    </div>
  );
}
