import { useEffect, useTransition } from "react";
import { useChat } from "./contex";
import { Trigger } from "./components/trigger";
import { ChatContent } from "./components/chat-content";
import { Separator } from "../../components/ui/separator";
import { CloseButton } from "./components/close-button";
import { TextArea } from "./components/text-area";
import { Wrapper } from "./components/wrapper";
import { getAuthToken } from "../../services/getAuthToken";
import Cookies from "js-cookie";
import { verifyToken } from "../../services/verifyToken";
import { askChatbot } from "../../services/askChatBot";

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
        const token = await getAuthToken();

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

        if (!response) return;

        setChatbot((prev) => ({
          ...prev,
          messages: [
            ...messages,
            {
              type: "bot",
              value: response,
              time: new Date(),
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
        <div className="w-full h-full relative p-6 flex flex-col">
          <div className="flex justify-between items-end pt-3 pb-5">
            <h2 className="text-neutral-800 font-bold text-2xl">AlfredBot</h2>

            <CloseButton />
          </div>

          <Separator />

          <ChatContent />

          <div className="rounded-b-4xl bg-neutral-50 py-2 w-full h-auto flex items-center justify-center">
            <TextArea />
          </div>
        </div>
      </Wrapper>

      <Trigger />
    </>
  );
}
