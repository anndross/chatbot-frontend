import clsx from "clsx";
import { Message } from "./message";
import { useChat } from "../contex";

export function ChatContent() {
  const { chatbot } = useChat();

  return (
    <div
      className={clsx({
        "w-full h-full max-h-auto pt-6 pr-2.5 overflow-y-scroll": true,
      })}
    >
      {chatbot.messages.map((msg, i) => (
        <Message key={i} variant={msg.type} text={msg.value} time={msg.time} />
      ))}

      {chatbot.loadingMessage && <Message variant="loading" />}
    </div>
  );
}
