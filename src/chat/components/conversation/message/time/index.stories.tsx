import { StoryObj } from "@storybook/react";
import {
  MessageTime,
  MessageTimeProps,
} from "@/chat/components/conversation/message/time";

export default {
  title: "Chat/Components/Message/Time",
  component: MessageTime,
};

export const User: StoryObj<MessageTimeProps> = {
  args: {
    time: new Date(),
    variant: "user",
  },
};

export const Bot: StoryObj<MessageTimeProps> = {
  args: {
    time: new Date(),
    variant: "bot",
  },
};
