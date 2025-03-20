import { useEffect, useTransition } from "react";
import { useChat } from "./contex";
import { Open } from "./components/triggers/open";
import { Content } from "./components/content";
import { Separator } from "../components/ui/separator";
import { Close } from "./components/triggers/close";
import { Wrapper } from "./components/wrapper";
import { getAuthToken } from "../services/getAuthToken";
import Cookies from "js-cookie";
import { verifyToken } from "../services/verifyToken";
import { askChatbot } from "../services/askChatBot";
import { ActionsType } from "../types/chatbot";
import { Input } from "./components/input";

export function Chat() {
  const {
    chatbot: { messages, conversationId },
    updateAuth,
    setChatbot,
  } = useChat();

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setChatbot((prev) => ({
      ...prev,
      loadingMessage: isPending,
    }));
  }, [isPending, setChatbot]);

  useEffect(() => {
    async function auth() {
      const storedAuthToken = Cookies.get("auth_token");

      const updateToken = (token: string | null) => {
        updateAuth({
          token,
        });
      };

      if (storedAuthToken && verifyToken(storedAuthToken)) {
        updateToken(storedAuthToken);
      } else {
        const token = await getAuthToken("casa_mais_facil_cb");

        updateToken(token);
      }
    }

    auth();
  }, []);

  useEffect(() => {
    async function askToChat(message: string, conversationId: string) {
      startTransition(async () => {
        const response = await askChatbot(
          message,
          window.location.href,
          conversationId
        );

        if (!response) {
          setChatbot((prev) => ({
            ...prev,
            messages: [
              ...messages,
              {
                type: "bot",
                value: "Erro ao conectar com o chatbot.",
                time: new Date(),
              },
            ],
          }));
          return;
        }

        const mappedActionsResponse = response.actions.map(
          (act: ActionsType) => {
            return {
              type: act,
              data:
                act === "recommend_product"
                  ? response["recommended_products"]
                  : [],
            };
          }
        );

        setChatbot((prev) => ({
          ...prev,
          messages: [
            ...messages,
            {
              type: "bot",
              value: response.final_response,
              time: new Date(),
              actions: mappedActionsResponse,
            },
          ],
        }));
      });
    }

    const lastMessage = messages[messages.length - 1];

    if (lastMessage.type === "user" && conversationId.length)
      askToChat(lastMessage.value, conversationId);
  }, [messages, conversationId]);

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
