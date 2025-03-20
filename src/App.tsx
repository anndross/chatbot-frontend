import { Chat } from "./chat";
import { ChatProvider } from "./chat/contex";
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
