import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";
import { useChat } from "@/chat/context";
import { ChatPositions } from "@/main";

export interface WrapperProps {
  children: ReactNode | ReactNode[];
}

export function Wrapper({ children }: WrapperProps) {
  const {
    props,
    chatbot: { visible },
  } = useChat();

  const chatPosition = props?.chatPosition as ChatPositions;

  const mappedOpenStyles: Record<
    "default" | ChatPositions,
    ComponentProps<"div">["className"]
  > = {
    default: "chat",
    left: "open-chat-from-left",
    right: "open-chat-from-right",
    "bottom-left": "open-chat-from-bottom-left",
    "bottom-right": "open-chat-from-bottom-right",
  };

  const mappedCloseStyles: Record<
    ChatPositions,
    ComponentProps<"div">["className"]
  > = {
    left: "close-chat-to-left",
    right: "close-chat-to-right",
    "bottom-left": "close-chat-to-bottom-left",
    "bottom-right": "close-chat-to-bottom-right",
  };

  return (
    <div
      className={clsx({
        [`${mappedOpenStyles.default}`]: true,
        [`${mappedOpenStyles[chatPosition]}`]: visible,
        [`${mappedCloseStyles[chatPosition]}`]: !visible,
        "mobile-open-chat-to-bottom": visible,
        "mobile-close-chat-to-bottom": !visible,
      })}
    >
      {children}
    </div>
  );
}
