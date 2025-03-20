import clsx from "clsx";
import { ReactNode } from "react";
import { useChat } from "../../contex";

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
        "w-[calc(100%-40px)] p-[21px] pb-6 px-6 flex flex-col origin-bottom md:w-[400px] md:origin-bottom-right h-[95vh] fixed right-5 bottom-5 duration-500 rounded-[48px] bg-primary shadow-[0_0px_16px_100px_rgba(0,0,0,0.50)] md:shadow-[0_0_12px_rgba(0,0,0,0.22)] z-[9999]":
          true,
        "opacity-0 scale-y-0  md:scale-0": !visible,
        "opacity-100 scale-y-100 md:scale-100": visible,
      })}
    >
      {children}
    </div>
  );
}
