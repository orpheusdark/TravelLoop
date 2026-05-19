import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

describe("accessibility audits", () => {
  it("has no obvious violations in the shared UI primitives", async () => {
    const { container } = render(
      <Card>
        <CardContent>
          <label htmlFor="destination">Destination</label>
          <Input id="destination" placeholder="Kyoto" />
          <Button className="mt-3">Plan trip</Button>
        </CardContent>
      </Card>
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});