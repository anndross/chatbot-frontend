import { useChat } from "@/chat/context";
import { askChatbot } from "@/services/askChatBot";
import { ChatbotResponse } from "@/types/chatbot";
import { useCallback, useEffect, useTransition } from "react";

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

            lastMessage.actions = [
              {
                type: "recommend_product",
                data: data.recommended_products,
              },
            ];

            return { ...prev };
          });
        }
      }

      startTransition(async () => {
        await askChatbot(question, conversationId, responseHandler);
      });
    },
    [conversationId, setChatbot]
  );

  return askToChat;
}

// response?.actions.map((act: ActionsType) => ({
//     type: act,
//     data:
//       act === "recommend_product"
//         ? response["recommended_products"]
//         : [],
//   })) as Actions[]
