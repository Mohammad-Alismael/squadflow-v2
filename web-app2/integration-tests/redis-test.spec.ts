// tests/setup.ts or in your test file
import { vi, describe, it, expect } from "vitest";
import { getRedisClient } from "@/lib/redis-setup";

describe("My Redis Tests", () => {
  it("should set and get values from Redis", async () => {
    const client = await getRedisClient();
    await client.set("key", "kso");
    const res = await client.get("key");
    expect(res).to.equal("kso");
  });
});
