import { Button } from "@/components/ui/button";
import { useChat } from "@/chat/contex";
import CloseSVG from "@/assets/close.svg";

export function Close() {
  const { updateChat } = useChat();

  return (
    <Button
      onClick={() => updateChat({ visible: false })}
      variant="secondary"
      onlyIcon
    >
      <img src={CloseSVG} alt="" width={16} height={16} />
    </Button>
  );
}
