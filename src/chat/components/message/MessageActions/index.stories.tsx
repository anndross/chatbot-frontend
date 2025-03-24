import { StoryObj } from "@storybook/react";
import { MessageActions, MessageActionsProps } from ".";

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
