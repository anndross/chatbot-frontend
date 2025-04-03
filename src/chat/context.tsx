import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Chatbot } from "@/types/chatbot";
import { Auth } from "@/types/auth";
import { MountWidgetProps } from "@/main";

export type ChatContextType = {
  props?: MountWidgetProps;
  chatbot: Chatbot;
  auth: Auth;
  setChatbot: Dispatch<SetStateAction<ChatContextType["chatbot"]>>;
  setAuth: Dispatch<SetStateAction<ChatContextType["auth"]>>;
  updateChat: (data: Partial<Chatbot>) => void;
  updateAuth: (data: Partial<Auth>) => void;
};

const ChatContext = createContext<ChatContextType>({
  props: undefined,
  chatbot: {
    visible: false,
    loadingMessage: false,
    messages: [],
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
  props?: MountWidgetProps;
}

export function ChatProvider({ children, props }: ChatProviderProps) {
  const [chatbot, setChatbot] = useState<Chatbot>({
    visible: false,
    loadingMessage: false,
    messages: [],
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
      value={{
        props,
        chatbot,
        setChatbot,
        updateChat,
        auth,
        setAuth,
        updateAuth,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
