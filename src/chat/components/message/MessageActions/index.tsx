import { ElementType } from "react";
import { Actions, ActionsType } from "@/types/chatbot";
import { RecommendedProductsAction } from "./RecommendedProductsAction";

interface MessageActionsProps {
  actions: Actions[];
}

export function MessageActions({ actions }: MessageActionsProps) {
  const mappedActions: Record<ActionsType, ElementType> = {
    recommend_product: RecommendedProductsAction,
    add_to_cart: () => <></>,
    see_more: () => <></>,
  };

  return (
    <>
      {actions.map((act) => {
        const Action = mappedActions[act.type];
        return <Action data={act.data} />;
      })}
    </>
  );
}
