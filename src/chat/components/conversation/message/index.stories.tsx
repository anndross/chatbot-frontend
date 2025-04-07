import { StoryObj } from "@storybook/react";
import { Message, MessageProps } from "@/chat/components/conversation/message";

export default {
  title: "Chat/Components/Message",
  component: Message,
};

export const User: StoryObj<MessageProps> = {
  args: {
    variant: "user",
    data: {
      id: "1",
      time: new Date(),
      value: "Mensagem do usuário.",
    },
  },
};

export const Bot: StoryObj<MessageProps> = {
  args: {
    variant: "bot",
    data: {
      id: "2",
      time: new Date(),
      value: "Mensagem do bot.",
    },
  },
};

export const Loading: StoryObj<MessageProps> = {
  args: {
    variant: "bot",
    data: {
      id: "3",
      time: new Date(),
      value: "",
    },
  },
};
