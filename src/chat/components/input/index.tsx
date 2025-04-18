import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { useChat } from "@/chat/context";
import { useDebounce } from "@/utils/debounce";
import SubmitSVG from "@/assets/submit.svg";
import { v4 as uuidv4 } from "uuid";

export function Input() {
  const {
    setChatbot,
    chatbot: { loadingMessage, visible },
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
        { type: "user", value: message, time: new Date(), id: uuidv4() },
      ],
    }));

    setValue("");
  }, 300);

  useEffect(() => {
    if (textareaRef.current && visible) {
      textareaRef.current.focus();
    }
  }, [textareaRef, visible]);

  useEffect(() => {
    let interval = null;

    if (window.localStorage.getItem("hasRatedChatbot")) return;

    if (visible) {
      interval = setInterval(() => {
        setChatbot((prev) => ({
          ...prev,
          downtimeInSeconds: prev.downtimeInSeconds + 1,
        }));
      }, 1000);
    }

    return () => {
      if (visible && interval) {
        clearInterval(interval);
      }
      setChatbot((prev) => ({ ...prev, downtimeInSeconds: 0 }));
    };
  }, [loadingMessage, visible, value]);

  return (
    <div
      className={clsx(
        "w-full h-auto min-h-[40px] py-2 px-3 flex justify-between items-center bg-secondary rounded-4xl duration-300",
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
          <span className="text-primary text-[10px] whitespace-nowrap">
            {inputMaxLength - value.length}/{inputMaxLength}
          </span>
        )}
        <Button
          type="button"
          onClick={() => onSubmit(value)}
          className="w-10 h-10"
          onlyIcon
        >
          {loadingMessage ? (
            <div className="h-3 w-3 bg-secondary" />
          ) : (
            <SubmitSVG />
          )}
        </Button>
      </div>
    </div>
  );
}
