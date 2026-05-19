import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it("renders and handles clicks", () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Book trip</Button>);

    fireEvent.click(screen.getByRole("button", { name: /book trip/i }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies the glass variant", () => {
    render(<Button variant="glass">Glass</Button>);

    expect(screen.getByRole("button", { name: /glass/i })).toHaveClass("glass");
  });
});