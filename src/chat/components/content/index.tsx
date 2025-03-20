import clsx from "clsx";
import { Message } from "../message";
import { useChat } from "../../context";
import { useEffect, useRef } from "react";

export function Content() {
  const { chatbot } = useChat();

  // mantém o scroll sempre no bottom quando recebe uma mensagem
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop =
        ref.current.scrollHeight - ref.current.offsetHeight;
    }
  }, [chatbot.messages, chatbot.loadingMessage]);

  return (
    <div
      className={clsx({
        "w-full h-full max-h-auto pt-[22px] pr-2.5 overflow-y-scroll ": true,
      })}
      ref={ref}
    >
      {chatbot.messages.map((msg, i) => (
        <Message key={i} variant={msg.type} data={msg} />
      ))}

      {chatbot.loadingMessage && <Message variant="loading" />}
    </div>
  );
}
