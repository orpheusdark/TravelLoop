import { describe, it, expect } from "vitest";
import { dedupeActivities } from "./activity-utils";

describe("dedupeActivities", () => {
  it("removes duplicate activity cards by id/title/category", () => {
    const activities = dedupeActivities([
      { id: 1, title: "Night market crawl", description: "A", category: "food", estimatedCost: 10, duration: 2, rating: 4.5 },
      { id: 1, title: "Night market crawl", description: "B", category: "food", estimatedCost: 12, duration: 3, rating: 4.6 },
      { id: 2, title: "Night market crawl", description: "C", category: "food", estimatedCost: 15, duration: 2, rating: 4.7 },
      { id: 3, title: "Museum evening pass", description: "D", category: "museums", estimatedCost: 15, duration: 2, rating: 4.7 }
    ]);

    expect(activities).toHaveLength(2);
    expect(activities[0].title).toBe("Night market crawl");
    expect(activities[1].title).toBe("Museum evening pass");
  });
});