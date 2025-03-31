import { Chat } from "@/chat";
import { ChatProvider } from "@/chat/context";
import { MountWidgetProps } from "@/main";

export interface WidgetProps {
  props?: MountWidgetProps;
}

const Widget = ({ props }: WidgetProps) => {
  return (
    <ChatProvider props={props}>
      <main id="chatbot">
        <Chat />
      </main>
    </ChatProvider>
  );
};

export default Widget;
