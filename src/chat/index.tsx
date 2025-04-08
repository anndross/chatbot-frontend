import { useEffect } from "react";
import { useChat } from "@/chat/context";
import { Open } from "@/chat/components/triggers/open";
import { Conversation } from "@/chat/components/conversation";
import { Separator } from "@/components/ui/separator";
import { Close } from "@/chat/components/triggers/close";
import { Wrapper } from "@/chat/components/wrapper";
import { Input } from "@/chat/components/input";
import { useAuth } from "@/hooks/auth";
import { useAskToChat } from "@/hooks/askToChat";

export function Chat() {
  const {
    chatbot: { messages, conversationId },
  } = useChat();

  const authenticate = useAuth();
  const askToChat = useAskToChat();

  useEffect(() => {
    authenticate();

    return () => {};
  }, [authenticate]);

  useEffect(() => {
    const question = messages[messages.length - 1];

    if (question?.type === "user" && conversationId) {
      askToChat(question.value);
    }
  }, [messages, conversationId, askToChat]);

  return (
    <>
      <Wrapper>
        <div className="flex justify-between items-end pt-3 pb-[22px]">
          <h2 className="text-secondary font-bold text-2xl">
            Vamos conversar?
          </h2>
          <Close />
        </div>

        <Separator />

        <Conversation />

        <div className="w-full h-auto flex items-center justify-center">
          <Input />
        </div>
      </Wrapper>

      <Open />
    </>
  );
}
