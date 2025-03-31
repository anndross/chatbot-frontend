import { StoryObj } from "@storybook/react";
import {
  MessageActions,
  MessageActionsProps,
} from "@/chat/components/message/MessageActions";

export default {
  title: "Chat/Components/Message/Actions",
  component: MessageActions,
};

export const RecommendProduct: StoryObj<MessageActionsProps> = {
  args: {
    actions: [
      {
        type: "recommend_product",
        data: [],
      },
    ],
  },
};
