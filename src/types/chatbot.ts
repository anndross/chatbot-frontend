export type Chatbot = {
  visible: boolean;
  messages: Message[];
  conversationId: string;
  loadingMessage: boolean;
};

export type Message = {
  type: "user" | "bot";
  value: string;
  time: Date;
};
