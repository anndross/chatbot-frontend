import { Chat } from "./modules/chat";
import { ChatProvider } from "./modules/chat/contex";
import "./App.css";

const App = () => {
  return (
    <ChatProvider>
      <main id="chatbot">
        <Chat />
      </main>
    </ChatProvider>
  );
};

export default App;
