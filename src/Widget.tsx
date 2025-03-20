import { Chat } from "./chat";
import { ChatProvider } from "./chat/context";
import { MountWidgetProps } from "./main";
import "./Widget.css";

export interface WidgetProps {
  props?: MountWidgetProps;
}

const Widget = ({ props }: WidgetProps) => {
  return (
    <ChatProvider>
      <main id="chatbot">
        <Chat props={props} />
      </main>
    </ChatProvider>
  );
};

export default Widget;
