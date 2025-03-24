import { useChat } from "@/chat/context";
import { askChatbot } from "@/services/askChatBot";
import { useCallback } from "react";

export function useAskToChat() {
  const {
    chatbot: { messages, conversationId },
    setChatbot,
  } = useChat();

  const askToChat = useCallback(
    async (message: string) => {
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

      function responseHandler(text: string) {
        setChatbot((prev) => {
          const lastMessage = prev.messages[prev.messages?.length - 1];

          if (lastMessage.type === "user") return prev;

          lastMessage.value = text;

          return {
            ...prev,
          };
        });
      }

      await askChatbot(message, conversationId, responseHandler);
    },
    [messages]
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
