import { StoryObj } from "@storybook/react";
import { Wrapper, WrapperProps } from "@/chat/components/wrapper";

export default {
  title: "Chat/Components/Wrapper",
  component: Wrapper,
};

export const Default: StoryObj<WrapperProps> = {
  args: {
    children: <div>teste</div>,
  },
};
