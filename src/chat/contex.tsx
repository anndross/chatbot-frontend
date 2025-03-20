import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Chatbot } from "../types/chatbot";
import { Auth } from "../types/auth";

export type ChatContextType = {
  chatbot: Chatbot;
  auth: Auth;
  setChatbot: Dispatch<SetStateAction<ChatContextType["chatbot"]>>;
  setAuth: Dispatch<SetStateAction<ChatContextType["auth"]>>;
  updateChat: (data: Partial<Chatbot>) => void;
  updateAuth: (data: Partial<Auth>) => void;
};

const ChatContext = createContext<ChatContextType>({
  chatbot: {
    visible: false,
    loadingMessage: false,
    messages: [
      {
        type: "bot",
        value:
          "Oi, estou aqui para te ajudar e fornecer informações sobre esse produto :)",
        time: new Date(),
      },
    ],
    conversationId: "",
  },
  auth: {
    token: "",
  },
  setChatbot: () => {},
  setAuth: () => {},
  updateChat: () => {},
  updateAuth: () => {},
});

interface ChatProviderProps {
  children: ReactNode | ReactNode[];
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [chatbot, setChatbot] = useState<Chatbot>({
    visible: false,
    loadingMessage: false,
    messages: [
      {
        type: "bot",
        value:
          "Oi, estou aqui para te ajudar e fornecer informações sobre esse produto :)",
        time: new Date(),
      },
    ],
    conversationId: crypto.randomUUID(),
  });

  const [auth, setAuth] = useState<Auth>({
    token: "",
  });

  const updateChat = (data: Partial<Chatbot>) => {
    setChatbot((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const updateAuth = (data: Partial<Auth>) => {
    setAuth((prev) => ({
      ...prev,
      ...data,
    }));
  };

  return (
    <ChatContext.Provider
      value={{ chatbot, setChatbot, updateChat, auth, setAuth, updateAuth }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
