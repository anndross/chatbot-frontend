export type Chatbot = {
  visible: boolean;
  messages: Message[];
  conversationId: string;
  loadingMessage: boolean;
};

export type MessageType = "user" | "bot";

export type Message = {
  type: MessageType;
  value: string;
  time: Date;
  actions?: Actions[];
};

export type Actions =
  | {
      type: "recommend_product";
      data: RecommendedProductsType;
    }
  | {
      type: "add_to_cart";
      data: undefined | [];
    }
  | {
      type: "see_more";
      data: undefined | [];
    };

export type ActionsType = "add_to_cart" | "see_more" | "recommend_product";
export type RecommendedProductsType = { id: string }[];

export interface ChatbotResponse {
  response: {
    final_response: string;
    actions: ActionsType[] | [];
    recommended_products: RecommendedProductsType | [];
  };
}
