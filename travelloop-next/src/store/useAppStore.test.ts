import { describe, it, expect, beforeEach } from "vitest";
import { useAppStore } from "./useAppStore";

describe("useAppStore", () => {
  beforeEach(() => {
    useAppStore.setState({
      token: null,
      user: null,
      recentSearches: ["Kyoto", "Iceland", "Marrakech"]
    });
  });

  it("persists auth state in memory store updates", () => {
    useAppStore.getState().setAuth({ id: 7, name: "Ava", email: "ava@example.com" }, "token-7");

    expect(useAppStore.getState().token).toBe("token-7");
    expect(useAppStore.getState().user?.name).toBe("Ava");
  });

  it("deduplicates recent searches", () => {
    useAppStore.getState().addRecentSearch("Kyoto");

    expect(useAppStore.getState().recentSearches[0]).toBe("Kyoto");
    expect(useAppStore.getState().recentSearches).toHaveLength(3);
  });

  it("stores destination handoff state", () => {
    useAppStore.getState().setPendingDestination("Amalfi Coast");
    useAppStore.getState().saveDestination("Amalfi Coast");

    expect(useAppStore.getState().pendingDestination).toBe("Amalfi Coast");
    expect(useAppStore.getState().savedDestinations).toContain("Amalfi Coast");
  });
});