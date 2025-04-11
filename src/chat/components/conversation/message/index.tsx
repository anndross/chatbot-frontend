import { ActionsType, Message as MessageType } from "@/types/chatbot";
import { ElementType } from "react";
import { AnswerRating } from "./mapped-messages/answer-rating";
import { DefaultMessage } from "./mapped-messages/default-message";
import { RecommendedProducts } from "./mapped-messages/recommended-product";

export type MessageVariant = "user" | "bot";

export interface MessageProps {
  variant: MessageVariant;
  data?: Omit<MessageType, "type">;
}

export function Message({ variant, data }: MessageProps) {
  const { action } = data || {};

  const mappedMessages: Record<ActionsType | "default", ElementType> = {
    default: DefaultMessage,
    recommended_products: RecommendedProducts,
    rating: AnswerRating,
    add_to_cart: () => <></>,
    see_more: () => <></>,
  };

  const CurrentMessage = mappedMessages[action?.type || "default"];

  return (
    <>
      <CurrentMessage data={data} variant={variant} />
    </>
  );
}
