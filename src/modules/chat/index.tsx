import { useState } from "react";
import clsx from "clsx";
import ChatContext from "./contex";

export function Chat() {
  const [chatbot, setChatbot] = useState(false);

  return (
    <ChatContext.Provider value={{ chatbot, setChatbot }}>
      <div
        className={clsx({
          "w-[400px] h-[95vh] p-6 fixed right-5 bottom-5 flex flex-col duration-200 rounded-[48px] bg-neutral-50 shadow-[0_2px_16px_rgba(0,0,0,0.25)] z-[9999]":
            true,
          "opacity-0 scale-0": !chatbot,
          "opacity-100 scale-100": chatbot,
        })}
      >
        <div></div>
      </div>
    </ChatContext.Provider>
  );
}
