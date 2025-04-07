export type Chatbot = {
  visible: boolean;
  messages: Message[];
  conversationId: string;
  loadingMessage: boolean;
  downtimeInSeconds: number;
};

export type MessageType = "user" | "bot";

export type Message = {
  id: string;
  type: MessageType;
  value: string;
  time: Date;
  action?: Actions;
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
    }
  | {
      type: "rating";
      data: undefined | [];
    };

export type ActionsType =
  | "add_to_cart"
  | "see_more"
  | "recommend_product"
  | "rating";

export type RecommendedProductsType = string[];

export interface ChatbotResponse {
  final_response: string;
  actions: ActionsType[] | [];
  recommended_products: RecommendedProductsType | [];
}
