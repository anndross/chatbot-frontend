import { useCallback, useState } from "react";
import clsx from "clsx";
import { Button } from "../../../components/ui/button";
import { useChat } from "../contex";
import { debounce } from "../../../utils/debounce";
import SubmitSVG from "../../../assets/submit.svg";

export function TextArea() {
  const { setChatbot } = useChat();
  const [value, setValue] = useState<string>("");

  const inputMaxLength: number = 500;

  const onSubmit = useCallback(
    debounce((value: string) => {
      if (!value.length) return;

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
    }, 300),
    []
  );

  return (
    <div className="w-full py-1 px-2 flex justify-between items-center bg-neutral-700 rounded-4xl  duration-300">
      <textarea
        maxLength={inputMaxLength}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        placeholder="O que você quer saber?"
        className={clsx({
          "w-full outline-0 px-6 text-neutral-50 resize-none placeholder:text-neutral-500 placeholder:font-medium text-sm":
            true,
          "py-5": value.length,
          "h-5": !value.length,
        })}
      />

      <div className="h-full justify-end items-center flex flex-col gap-2">
        {!!value.length && (
          <span className="text-neutral-50 text-[10px]">
            {500 - value.length}/500
          </span>
        )}
        <Button
          type="button"
          onClick={() => onSubmit(value)}
          className="w-11 h-11"
          onlyIcon
        >
          <img src={SubmitSVG} alt="" width={44} height={44} />
        </Button>
      </div>
    </div>
  );
}
