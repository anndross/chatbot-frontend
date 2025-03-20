import { Button } from "@/components/ui/button";
import { useChat } from "@/chat/context";
import CloseSVG from "@/assets/close.svg";

export function Close() {
  const { updateChat } = useChat();

  return (
    <Button
      onClick={() => updateChat({ visible: false })}
      variant="secondary"
      onlyIcon
    >
      <CloseSVG />
    </Button>
  );
}
