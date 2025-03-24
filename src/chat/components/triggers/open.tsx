import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { useChat } from "@/chat/context";
import ChatSVG from "@/assets/chat.svg";
import { useEffect } from "react";

export function Open() {
  const {
    props,
    setChatbot,
    chatbot: { loadingMessage },
  } = useChat();

  useEffect(() => {
    function triggerChatWithMessage() {
      if (!props?.customInputId) return;

      const input = document.getElementById(
        props.customInputId
      ) as HTMLInputElement;
      const value = input?.value;

      if (!value.length) return;

      setChatbot((prev) => ({
        ...prev,
        visible: true,
        messages: [...prev.messages, { type: "user", value, time: new Date() }],
      }));

      input.value = "";
    }

    function triggerChatWithMessageByEnter(event: KeyboardEvent) {
      if (event.key === "Enter") triggerChatWithMessage();
    }

    function triggerChat() {
      setChatbot((prev) => ({ ...prev, visible: true }));
    }

    if (props?.customButtonId) {
      const button = document.getElementById(props?.customButtonId || "");
      const input = document.getElementById(props?.customInputId || "");

      if (!button) return;

      // Remove os eventos antigos antes de adicionar novos
      button.removeEventListener("click", triggerChatWithMessage);
      button.removeEventListener("click", triggerChat);

      if (input)
        input.removeEventListener("keyup", triggerChatWithMessageByEnter);

      if (input && !loadingMessage) {
        button.addEventListener("click", triggerChatWithMessage);
        input.addEventListener("keyup", triggerChatWithMessageByEnter);
      } else {
        button.addEventListener("click", triggerChat);
      }
    }

    // Cleanup para evitar múltiplos binds
    return () => {
      if (props?.customButtonId) {
        const button = document.getElementById(props?.customButtonId || "");
        const input = document.getElementById(props?.customInputId || "");

        button?.removeEventListener("click", triggerChatWithMessage);
        button?.removeEventListener("click", triggerChat);
        input?.removeEventListener("keyup", triggerChatWithMessageByEnter);
      }
    };
  }, [props, loadingMessage]);

  if (props?.customButtonId && props?.customInputId) return null;

  return <NativeOpen />;
}

const NativeOpen = () => {
  const { props, chatbot, updateChat } = useChat();

  return (
    <Button
      className={clsx({
        "hover:-translate-y-1 stroke-secondary hover:stroke-primary": true,
        hidden: chatbot.visible,
        "absolute bottom-5 left-5": props?.triggerPosition === "left",
        "absolute bottom-5 right-5": props?.triggerPosition === "right",
      })}
      onClick={() => updateChat({ visible: true })}
    >
      <ChatSVG />
      Chatbot
    </Button>
  );
};
