import clsx from "clsx";
import { Message } from "@/chat/components/message";
import { useChat } from "@/chat/context";
import { useEffect, useRef } from "react";
import { useDebounce } from "@/utils/debounce";

export type WindowWithInitialChatResponse = typeof window & {
  initialChatResponse: boolean;
};

export function Content() {
  const {
    chatbot: { messages, loadingMessage, visible },
    setChatbot,
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

  const defaultMessage =
    "Olá! 👋 Para te ajudar da melhor forma, você pode seguir o exemplo abaixo na sua pergunta:\n\n🛠️ Exemplo: Estou reformando meu espaço e preciso cobrir 200m² com este produto. Quantas unidades devo comprar? 🤔";

  const message =
    (props?.customInitialMessage || defaultMessage).match(/[^\n]|\n/g) || [];

  const timeToType = 10;

  const enableUserToType = useDebounce(() => {
    setChatbot((prev) => ({ ...prev, loadingMessage: false }));
  }, message.length * timeToType);

  useEffect(() => {
    function animateFirstMessage() {
      message.forEach((letter, index) => {
        setTimeout(() => {
          setChatbot((prev) => ({
            ...prev,
            messages: [
              {
                time: new Date(),
                type: "bot",
                actions: [],
                value:
                  (prev.messages.filter((msg) => msg.type === "bot")?.[0]
                    ?.value || "") + letter,
              },
            ],
            loadingMessage: true,
          }));
        }, index * timeToType); // Adiciona um atraso crescente a cada letra
      });

      enableUserToType();
    }

    if (
      visible &&
      !(window as WindowWithInitialChatResponse).initialChatResponse
    ) {
      animateFirstMessage();
      (window as WindowWithInitialChatResponse).initialChatResponse = true;
    }
  }, [visible]);

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
