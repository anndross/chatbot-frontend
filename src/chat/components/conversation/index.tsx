import clsx from "clsx";
import { Message } from "@/chat/components/conversation/message";
import { useChat } from "@/chat/context";
import { useEffect, useRef } from "react";
import { useAddAnimatedMessage } from "@/hooks/addAnimatedMessage";
import { v4 as uuidv4 } from "uuid";

export type WindowWithInitialChatResponse = typeof window & {
  initialChatResponse: boolean;
};

export function Conversation() {
  const {
    chatbot: { messages, loadingMessage, visible, downtimeInSeconds },
    props,
  } = useChat();

  const lastMessage = messages[messages.length - 1]?.value;

  // Mantém o scroll sempre na parte inferior quando recebe uma mensagem
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop =
        ref.current.scrollHeight - ref.current.offsetHeight;
    }
  }, [lastMessage, loadingMessage]);

  const addAnimatedMessage = useAddAnimatedMessage();

  useEffect(() => {
    const defaultMessage =
      "Olá! 👋 Para te ajudar da melhor forma, você pode seguir o exemplo abaixo na sua pergunta:\n\n🛠️ Exemplo: Estou reformando meu espaço e preciso cobrir 200m² com este produto. Quantas unidades devo comprar? 🤔";
    const message = props?.customInitialMessage || defaultMessage;

    if (
      visible &&
      !(window as WindowWithInitialChatResponse).initialChatResponse
    ) {
      addAnimatedMessage({
        time: new Date(),
        type: "bot",
        id: uuidv4(),
        value: message,
      });

      (window as WindowWithInitialChatResponse).initialChatResponse = true;
    }
  }, [visible]);

  useEffect(() => {
    if (
      downtimeInSeconds > 20 &&
      visible &&
      !window.localStorage.getItem("hasRatedChatbot")
    ) {
      addAnimatedMessage({
        time: new Date(),
        type: "bot",
        id: uuidv4(),
        value: "Gostou da interação com o chat?",
        action: {
          type: "rating",
          data: undefined,
        },
      });

      window.localStorage.setItem("hasRatedChatbot", "true");
    }

    return () => {};
  }, [downtimeInSeconds, visible]);

  return (
    <div
      className={clsx({
        "w-full h-full max-h-auto pt-[22px] pr-2.5 overflow-y-scroll ": true,
      })}
      ref={ref}
    >
      {messages.map((msg) => {
        return <Message key={msg.id} variant={msg.type} data={msg} />;
      })}
    </div>
  );
}
