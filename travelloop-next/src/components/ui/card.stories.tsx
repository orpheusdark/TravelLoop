import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent, CardTitle } from "./card";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card>
      <CardContent>
        <CardTitle>Amalfi Coast</CardTitle>
        <p className="mt-2 text-sm text-slate-300">Cinematic trip details, budget signals, and itinerary hooks.</p>
      </CardContent>
    </Card>
  )
};