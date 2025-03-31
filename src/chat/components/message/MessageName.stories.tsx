import { StoryObj } from "@storybook/react";
import {
  MessageName,
  MessageNameProps,
} from "@/chat/components/message/MessageName";

export default {
  title: "Chat/Components/Message/Name",
  component: MessageName,
};

export const User: StoryObj<MessageNameProps> = {
  args: {
    variant: "user",
  },
};

export const Bot: StoryObj<MessageNameProps> = {
  args: {
    variant: "bot",
  },
};
