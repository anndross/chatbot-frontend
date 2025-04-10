import { useChat } from "@/chat/context";
import { askChatbot } from "@/services/askChatBot";
import { ChatbotResponse } from "@/types/chatbot";
import { useCallback, useEffect, useTransition } from "react";
import { v4 as uuidv4 } from "uuid";

export function useAskToChat() {
  const {
    chatbot: { conversationId },
    setChatbot,
  } = useChat();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setChatbot((prev) => ({ ...prev, loadingMessage: isPending }));
  }, [isPending]);

  const askToChat = useCallback(
    async (question: string) => {
      setChatbot((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            type: "bot",
            value: "",
            id: uuidv4(),
            time: new Date(),
            actions: [],
          },
        ],
      }));

      async function responseHandler(data: string | ChatbotResponse) {
        if (typeof data === "string") {
          setChatbot((prev) => {
            const lastMessage = prev.messages[prev.messages?.length - 1];

            if (lastMessage.type === "user") return prev;

            lastMessage.value = data;

            return { ...prev };
          });
        } else {
          setChatbot((prev) => {
            const lastMessage = prev.messages[prev.messages?.length - 1];

            if (lastMessage.type === "user") return prev;

            lastMessage.action = {
              type: "recommend_product",
              data: data.recommended_products,
            };

            return { ...prev };
          });
        }
      }

      startTransition(async () => {
        await askChatbot(question, responseHandler);
      });
    },
    [conversationId, setChatbot]
  );

  return askToChat;
}
