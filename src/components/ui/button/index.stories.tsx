import { StoryObj } from "@storybook/react";
import { Button, ButtonProps } from ".";

export default {
  title: "Components/UI/Button",
  component: Button,
};

export const Primary: StoryObj<ButtonProps> = {
  args: {
    variant: "primary",
    children: "Button",
  },
};

export const Secondary: StoryObj<ButtonProps> = {
  args: {
    variant: "secondary",
    children: "Button",
  },
};

export const OnlyIconPrimary: StoryObj<ButtonProps> = {
  args: {
    variant: "primary",
    children: <>&#169;</>,
    onlyIcon: true,
  },
};

export const OnlyIconSecondary: StoryObj<ButtonProps> = {
  args: {
    variant: "secondary",
    children: <>&#169;</>,
    onlyIcon: true,
  },
};
