import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  args: {
    children: "Launch trip"
  }
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Glass: Story = {
  args: {
    variant: "glass",
    children: "Glass action"
  }
};

export const Sunset: Story = {
  args: {
    variant: "sunset",
    children: "Book now"
  }
};