import { useEffect, useTransition, useCallback } from "react";
import { useChat } from "./context";
import { Open } from "./components/triggers/open";
import { Content } from "./components/content";
import { Separator } from "../components/ui/separator";
import { Close } from "./components/triggers/close";
import { Wrapper } from "./components/wrapper";
import { getAuthToken } from "../services/getAuthToken";
import Cookies from "js-cookie";
import { verifyToken } from "../services/verifyToken";
import { askChatbot } from "../services/askChatBot";
import { Actions, ActionsType } from "../types/chatbot";
import { Input } from "./components/input";

export function Chat() {
  const {
    chatbot: { messages, conversationId },
    updateAuth,
    setChatbot,
  } = useChat();

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setChatbot((prev) => ({ ...prev, loadingMessage: isPending }));
  }, [isPending, setChatbot]);

  const authenticate = useCallback(async () => {
    const storedAuthToken = Cookies.get("auth_token");
    const updateToken = (token: string | null) => updateAuth({ token });

    if (storedAuthToken && verifyToken(storedAuthToken)) {
      updateToken(storedAuthToken);
    } else {
      const token = await getAuthToken();
      updateToken(token);
    }
  }, []);

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  const askToChat = useCallback(
    async (message: string, conversationId: string) => {
      startTransition(async () => {
        const response = await askChatbot(message, conversationId);

        setChatbot((prev) => ({
          ...prev,
          messages: [
            ...messages,
            {
              type: "bot",
              value:
                response?.final_response || "Erro ao conectar com o chatbot.",
              time: new Date(),
              actions: response?.actions.map((act: ActionsType) => ({
                type: act,
                data:
                  act === "recommend_product"
                    ? response["recommended_products"]
                    : [],
              })) as Actions[],
            },
          ],
        }));
      });
    },
    [messages]
  );

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.type === "user" && conversationId) {
      askToChat(lastMessage.value, conversationId);
    }
  }, [messages, conversationId, askToChat]);

  return (
    <>
      <Wrapper>
        <div className="flex justify-between items-end pt-3 pb-[22px]">
          <h2 className="text-secondary font-bold text-2xl">AlfredBot</h2>
          <Close />
        </div>
        <Separator />
        <Content />
        <div className="rounded-b-4xl bg-primary w-full h-auto flex items-center justify-center">
          <Input />
        </div>
      </Wrapper>
      <Open />
    </>
  );
}
