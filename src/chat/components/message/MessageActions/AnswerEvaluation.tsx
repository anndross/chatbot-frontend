import { useChat } from "@/chat/context";
import { Button } from "@/components/ui/button";
import { Message } from "@/types/chatbot";
import { useEffect, useState } from "react";

export interface AnswerEvaluationProps {
  data: Partial<Message>;
}

export function AnswerEvaluation({ data }: AnswerEvaluationProps) {
  if (data?.type === "user") return null;

  const [like, setLike] = useState<null | boolean>(null);
  const { setChatbot } = useChat();

  useEffect(() => {
    setChatbot((prev) => ({
      ...prev,
      messages: [...prev.messages],
    }));
  }, [like]);

  return (
    <div className="flex gap-5 mt-4">
      <Button
        className="rounded-sm border border-primary"
        onClick={() => setLike(true)}
      >
        Sim
      </Button>
      <Button
        className="rounded-sm border border-primary"
        onClick={() => setLike(false)}
      >
        Não
      </Button>
    </div>
  );
}
