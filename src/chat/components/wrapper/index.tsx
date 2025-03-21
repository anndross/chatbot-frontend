import clsx from "clsx";
import { ReactNode } from "react";
import { useChat } from "../../context";
import { ChatPositions } from "@/main";

interface WrapperProps {
  children: ReactNode | ReactNode[];
}

export function Wrapper({ children }: WrapperProps) {
  const {
    props,
    chatbot: { visible },
  } = useChat();

  const chatPosition = props?.chatPosition as ChatPositions;

  return (
    <div
      className={clsx({
        "w-[calc(100%-40px)] p-[21px] pb-6 px-6 flex flex-col origin-bottom md:w-[400px] h-[95vh] fixed right-5 bottom-5 duration-500 rounded-[48px] bg-primary shadow-wrapper md-shadow-wrapper z-[9999]":
          true,
        "opacity-0 scale-y-0 md:scale-0 pointer-events-none": !visible,
        "opacity-100 scale-y-100 md:scale-100 pointer-events-auto": visible,
        "right-5 bottom-5 md:origin-bottom-right":
          chatPosition === "right-bottom",
        "left-5 bottom-5 md:origin-bottom-left": chatPosition === "left-bottom",
        "left-5 bottom-5 md:origin-left md:scale-y-100":
          chatPosition === "left",
        "right-5 bottom-5 md:origin-right md:scale-y-100":
          chatPosition === "right",
      })}
    >
      {children}
    </div>
  );
}
