import clsx from "clsx";
import { Message } from "@/chat/components/message";
import { useChat } from "@/chat/context";
import { useEffect, useRef } from "react";

export function Content() {
  const {
    chatbot: { messages },
  } = useChat();

  const lastMessage = messages[messages.length - 1].value;

  // Mantém o scroll sempre na parte inferior quando recebe uma mensagem
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop =
        ref.current.scrollHeight - ref.current.offsetHeight;
    }
  }, [lastMessage]);

  return (
    <div
      className={clsx({
        "w-full h-full max-h-auto pt-[22px] pr-2.5 overflow-y-scroll ": true,
      })}
      ref={ref}
    >
      {messages.map((msg, i) => {
        return <Message key={i} variant={msg.type} data={msg} />;
      })}
    </div>
  );
}
