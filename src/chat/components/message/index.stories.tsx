import { StoryObj } from "@storybook/react";
import { Message, MessageProps } from ".";

export default {
  title: "Chat/Components/Message",
  component: Message,
};

export const User: StoryObj<MessageProps> = {
  args: {
    variant: "user",
    data: {
      time: new Date(),
      value: "Mensagem do usuário.",
      actions: [],
    },
  },
};

export const Bot: StoryObj<MessageProps> = {
  args: {
    variant: "bot",
    data: {
      time: new Date(),
      value: "Mensagem do bot.",
      actions: [],
    },
  },
};

export const Loading: StoryObj<MessageProps> = {
  args: {
    variant: "bot",
    data: {
      time: new Date(),
      value: "",
      actions: [],
    },
  },
};
