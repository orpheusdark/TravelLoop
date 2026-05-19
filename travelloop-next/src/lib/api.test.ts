import { describe, it, expect, vi, beforeEach } from "vitest";
import { authApi, tripApi } from "./api";

describe("api layer", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("uses the backend register endpoint", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ token: "token-1", user: { id: 1, name: "Ava", email: "ava@example.com" } }), {
        status: 201,
        headers: { "Content-Type": "application/json" }
      })
    );
    vi.stubGlobal("fetch", fetchMock);

    await authApi.register({ name: "Ava", email: "ava@example.com", password: "password123" });

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/auth/register"),
      expect.objectContaining({ method: "POST" })
    );
  });

  it("requests trips with the token header", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ trips: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      })
    );
    vi.stubGlobal("fetch", fetchMock);

    await tripApi.getTrips("auth-token");

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/trips"),
      expect.objectContaining({ headers: expect.objectContaining({ Authorization: "Bearer auth-token" }) })
    );
  });
});