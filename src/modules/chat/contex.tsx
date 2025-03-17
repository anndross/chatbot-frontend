import { createContext, Dispatch, SetStateAction } from "react";

export type ChatContextType = {
  chatbot: boolean;
  setChatbot: Dispatch<SetStateAction<ChatContextType["chatbot"]>>;
};

const ChatContext = createContext<ChatContextType>({
  chatbot: false,
  setChatbot: () => {},
});

export default ChatContext;
