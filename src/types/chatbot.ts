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
      type: "recommended_products";
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
  | "recommended_products"
  | "rating";

export type RecommendedProductsType = {
  name: string;
  imageUrl: string;
  price: number;
  listPrice: number;
  itemId: string;
  link: string;
  sellerId: string;
}[];

export type ChatbotResponse =
  | string
  | {
      ui_action: Actions;
    };
