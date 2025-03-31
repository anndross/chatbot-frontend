import { ElementType, useEffect, useState } from "react";
import { Actions, ActionsType } from "@/types/chatbot";
import { RecommendedProductsAction } from "@/chat/components/message/MessageActions/RecommendedProductsAction";

export interface MessageActionsProps {
  actions: Actions[];
}

export function MessageActions({ actions }: MessageActionsProps) {
  const [currentActions, setCurrentActions] = useState<Actions[]>(actions);

  useEffect(() => {
    setCurrentActions(actions);
  }, [actions]);

  const mappedActions: Record<ActionsType, ElementType> = {
    recommend_product: RecommendedProductsAction,
    add_to_cart: () => <></>,
    see_more: () => <></>,
  };

  return (
    <>
      {currentActions.map((act) => {
        const Action = mappedActions[act.type];
        return <Action key={JSON.stringify(act)} data={act.data} />;
      })}
    </>
  );
}
