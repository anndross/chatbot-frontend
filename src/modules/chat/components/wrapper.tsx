import clsx from "clsx";
import { ReactNode } from "react";
import { useChat } from "../contex";

interface WrapperProps {
  children: ReactNode | ReactNode[];
}

export function Wrapper({ children }: WrapperProps) {
  const {
    chatbot: { visible },
  } = useChat();

  return (
    <div
      className={clsx({
        "w-[400px] h-[95vh] fixed right-5 bottom-5 duration-200 rounded-[48px] bg-neutral-50 shadow-[0_2px_16px_rgba(0,0,0,0.25)] z-[9999]":
          true,
        "opacity-0 scale-0": !visible,
        "opacity-100 scale-100": visible,
      })}
    >
      {children}
    </div>
  );
}
