import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { useChat } from "@/chat/context";
import { useDebounce } from "@/utils/debounce";
import SubmitSVG from "@/assets/submit.svg";

export function Input() {
  const {
    setChatbot,
    chatbot: { loadingMessage },
  } = useChat();

  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputMaxLength = 500;

  useEffect(() => {
    const textArea = textareaRef.current;
    if (textArea) {
      textArea.style.height = "auto";
      textArea.style.height = `${textArea.scrollHeight}px`;
    }
  }, [value]);

  const onSubmit = useDebounce((message: string) => {
    if (!message.length || loadingMessage) return;

    setChatbot((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        { type: "user", value: message, time: new Date() },
      ],
    }));

    setValue("");
  }, 300);

  return (
    <div
      className={clsx(
        "w-full h-auto min-h-[40px] py-2 px-2 flex justify-between items-center bg-secondary rounded-4xl duration-300",
        { "py-3!": value.length }
      )}
    >
      <textarea
        ref={textareaRef}
        maxLength={inputMaxLength}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            onSubmit(value);
          }
        }}
        placeholder="O que você quer saber?"
        className={clsx(
          "w-full overflow-hidden outline-0 px-[18px] duration-300 text-primary resize-none placeholder:text-tertiary placeholder:font-medium text-sm",
          { "h-5!": !value.length }
        )}
      />
      <div className="h-full self-end justify-end p-1 items-center flex flex-col gap-2">
        {!!value.length && (
          <span className="text-primary text-[10px]">
            {inputMaxLength - value.length}/{inputMaxLength}
          </span>
        )}
        <Button
          type="button"
          onClick={() => onSubmit(value)}
          className="w-10 h-10"
          onlyIcon
        >
          <SubmitSVG />
        </Button>
      </div>
    </div>
  );
}
