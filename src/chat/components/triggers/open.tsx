import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { useChat } from "@/chat/context";
import ChatSVG from "@/assets/chat.svg";
// import { useEffect } from "react";
import { MountWidgetProps } from "@/main";

interface OpenProps {
  as?: MountWidgetProps;
}

export function Open({ as }: OpenProps) {
  console.log(as);
  // const {
  //   setChatbot,
  //   chatbot: { loadingMessage },
  // } = useChat();

  // useEffect(() => {
  //   function triggerChatWithMessage() {
  //     if (!as?.customInput) return;

  //     const input = as.customInput as HTMLInputElement;
  //     const value = input.value;

  //     if (!value.length) return;

  //     setChatbot((prev) => ({
  //       ...prev,
  //       visible: true,
  //       messages: [...prev.messages, { type: "user", value, time: new Date() }],
  //     }));

  //     input.value = "";
  //   }

  //   function triggerChatWithMessageByEnter(event: KeyboardEvent) {
  //     if (event.key === "Enter") triggerChatWithMessage();
  //   }

  //   function triggerChat() {
  //     setChatbot((prev) => ({ ...prev, visible: true }));
  //   }

  //   if (as?.customButton) {
  //     const button = document.getElementById(as?.customButton?.id || "");
  //     const input = document.getElementById(as?.customInput?.id || "");

  //     if (!button) return;

  //     // Remove os eventos antigos antes de adicionar novos
  //     button.removeEventListener("click", triggerChatWithMessage);
  //     button.removeEventListener("click", triggerChat);

  //     if (input)
  //       input.removeEventListener("keyup", triggerChatWithMessageByEnter);

  //     if (input && !loadingMessage) {
  //       button.addEventListener("click", triggerChatWithMessage);
  //       input.addEventListener("keyup", triggerChatWithMessageByEnter);
  //     } else {
  //       button.addEventListener("click", triggerChat);
  //     }
  //   }

  //   // Cleanup para evitar múltiplos binds
  //   return () => {
  //     if (as?.customButton) {
  //       const button = document.getElementById(as?.customButton?.id || "");
  //       const input = document.getElementById(as?.customInput?.id || "");

  //       button?.removeEventListener("click", triggerChatWithMessage);
  //       button?.removeEventListener("click", triggerChat);
  //       input?.removeEventListener("keyup", triggerChatWithMessageByEnter);
  //     }
  //   };
  // }, [as, loadingMessage]);

  // if (as?.customButton && as?.customInput) return null;

  return <NativeOpen />;
}

const NativeOpen = () => {
  const { chatbot, updateChat } = useChat();

  return (
    <Button
      className={clsx({
        "hover:-translate-y-1 stroke-secondary hover:stroke-primary": true,
        hidden: chatbot.visible,
      })}
      onClick={() => updateChat({ visible: true })}
    >
      <ChatSVG />
      Chatbot
    </Button>
  );
};
