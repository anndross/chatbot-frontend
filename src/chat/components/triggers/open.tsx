import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { useChat } from "@/chat/context";
import ChatSVG from "@/assets/chat.svg";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

type WindowWithChatWasOpenProps = typeof globalThis & {
  chatWasOpen?: boolean;
};

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

      if (!value.length) {
        setChatbot((prev) => ({
          ...prev,
          visible: true,
        }));
        return;
      }

      setChatbot((prev) => ({
        ...prev,
        visible: true,
        messages: [
          ...prev.messages,
          { id: uuidv4(), type: "user", value, time: new Date() },
        ],
      }));

      input.value = "";
    }

    function triggerChatWithMessageByEnter(event: KeyboardEvent) {
      if (event.key === "Enter") triggerChatWithMessage();
    }

    function openChatByInputFocus() {
      if ((window as WindowWithChatWasOpenProps)?.chatWasOpen) return;

      setChatbot((prev) => ({ ...prev, visible: true }));

      (window as WindowWithChatWasOpenProps).chatWasOpen = true;
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

      if (input) {
        input.removeEventListener("keyup", triggerChatWithMessageByEnter);
        input.removeEventListener("focus", openChatByInputFocus);
      }

      if (input && !loadingMessage) {
        button.addEventListener("click", triggerChatWithMessage);
        input.addEventListener("keyup", triggerChatWithMessageByEnter);
        input.addEventListener("focus", openChatByInputFocus);
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
        "fixed bottom-5 left-5": props?.triggerPosition === "left",
        "fixed bottom-5 right-5": props?.triggerPosition === "right",
      })}
      onClick={() => updateChat({ visible: true })}
    >
      <ChatSVG />
      Chatbot
    </Button>
  );
};
