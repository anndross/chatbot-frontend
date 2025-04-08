import { StoryObj } from "@storybook/react";
import {
  MessageWapperProps,
  MessageContainer,
} from "@/chat/components/conversation/message/container";
import { Loading as LoadingComponent } from "@/components/ui/loading";

export default {
  title: "Chat/Components/Message/Wrapper",
  component: MessageContainer,
};

export const User: StoryObj<MessageWapperProps> = {
  args: {
    variant: "user",
    children: "Mensagem do usuário.",
  },
};

export const Bot: StoryObj<MessageWapperProps> = {
  args: {
    variant: "bot",
    children: "Mensagem do bot.",
  },
};

export const Loading: StoryObj<MessageWapperProps> = {
  args: {
    variant: "bot",
    children: <LoadingComponent />,
  },
};
