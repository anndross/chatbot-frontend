import { useChat } from "@/chat/context";
import { Message } from "@/types/chatbot";

export function useAddAnimatedMessage() {
  const { setChatbot } = useChat();

  function animateMessage(data: Message, timeToTypePerLetter: number = 10) {
    const splittedMessage = data.value.match(/[^\n]|\n/g) || [];

    splittedMessage.forEach((letter, index) => {
      setTimeout(() => {
        setChatbot((prev) => {
          const newMessages = prev.messages;

          const foundMessageIndex = newMessages.findIndex(
            (msg) => msg.id === data.id
          );

          if (foundMessageIndex === -1) {
            newMessages.push({
              ...data,
              value: letter,
            });

            return {
              ...prev,
              messages: newMessages,
              loadingMessage: true,
            };
          }

          newMessages[foundMessageIndex] = {
            ...data,
            value: (prev.messages?.[foundMessageIndex]?.value || "") + letter,
          };

          return {
            ...prev,
            messages: newMessages,
            loadingMessage: index !== splittedMessage.length - 1,
          };
        });
      }, index * timeToTypePerLetter); // Adiciona um atraso crescente a cada letra
    });
  }

  return animateMessage;
}
