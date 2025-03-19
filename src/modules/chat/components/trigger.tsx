import clsx from "clsx";
import { Button } from "../../../components/ui/button";
import { useChat } from "../contex";
import ChatSVG from "../../../assets/chat.svg";

export function Trigger() {
  const { chatbot, updateChat } = useChat();

  return (
    <Button
      className={clsx({
        "hover:-translate-y-1 fixed bottom-5 right-5 ": true,
        hidden: chatbot.visible,
      })}
      onClick={() => updateChat({ visible: true })}
    >
      <img src={ChatSVG} width={24} height={24} />
      Chatbot
    </Button>
  );
}
