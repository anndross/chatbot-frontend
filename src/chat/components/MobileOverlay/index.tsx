import { useChat } from "@/chat/context";
import clsx from "clsx";
import { ReactNode } from "react";

export interface MobileOverlayProps {
  children: ReactNode | ReactNode[];
}

export function MobileOverlay({ children }: MobileOverlayProps) {
  const {
    chatbot: { visible },
    updateChat,
  } = useChat();

  return (
    <div
      className={clsx("w-fit h-fit md:bg-transparent md:static", {
        "w-full h-full bg-[#00000056] fixed top-0 left-0 duration-75": visible,
      })}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          event.stopPropagation();
          updateChat({ visible: false });
        }
      }}
    >
      {children}
    </div>
  );
}
