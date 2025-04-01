import { useState } from "react";
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

  const [value, setValue] = useState<string>("");

  const inputMaxLength: number = 500000;

  const onSubmit = useDebounce((value: string) => {
    if (!value.length || loadingMessage) return;

    setChatbot((prev) => {
      return {
        ...prev,
        messages: [
          ...prev.messages,
          {
            type: "user",
            value,
            time: new Date(),
          },
        ],
      };
    });

    setValue("");
  }, 300);

  function resetInputHeight(el: HTMLTextAreaElement) {
    el.style.height = "20px";
    el.value = "";
  }

  function textAreaAdjust(el: HTMLTextAreaElement) {
    if (el.value.length === 0) {
      resetInputHeight(el);
      return;
    }

    const startHeight = el.offsetHeight;
    el.style.height = "auto";
    const endHeight = el.scrollHeight;
    el.style.height = startHeight + "px";

    // Força o reflow
    void el.offsetHeight;
    el.style.height = endHeight + "px";
  }

  return (
    <div className="w-full h-auto min-h-[40px] py-2 px-2 flex justify-between items-center bg-secondary rounded-4xl duration-300">
      <textarea
        maxLength={inputMaxLength}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        onKeyUp={(event) => {
          const key = event.key;

          if (
            /^[a-zA-Z]$/.test(key) ||
            /^\d$/.test(key) ||
            key === "Backspace" ||
            key === "Delete"
          ) {
            textAreaAdjust(event.target as HTMLTextAreaElement);
          }

          if (key === "Enter") {
            event.preventDefault();
            resetInputHeight(event.target as HTMLTextAreaElement);

            onSubmit(value);
          }
        }}
        placeholder="O que você quer saber?"
        className={clsx({
          "w-full overflow-hidden outline-0 px-[18px] duration-300 text-primary resize-none placeholder:text-tertiary placeholder:font-medium text-sm":
            true,
          "h-5": !value.length,
        })}
      />

      <div className="h-full self-end justify-end p-1 items-center flex flex-col gap-2">
        {!!value.length && (
          <span className="text-primary text-[10px]">
            {500 - value.length}/500
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
