// @ts-nocheck
import { vi } from "vitest";
import redisMock from "redis-mock";

vi.mock("server-only", () => {
  return {
    // mock server-only module
  };
});
vi.mock("react", () => ({
  ...vi.importActual("react"),
  cache: vi.fn((fn) => fn),
}));
vi.mock("@/lib/mongodb", () => ({
  connectMongoDB: vi.fn(),
}));
vi.mock("redis", () => ({
  createClient: () => {
    const client = redisMock.createClient();
    return {
      connect: () => Promise.resolve(),
      set: (key: string, value: string) =>
        new Promise((resolve) => client.set(key, value, resolve)),
      get: (key: string) =>
        new Promise((resolve) =>
          client.get(key, (err, result) => resolve(result))
        ),
      on: vi.fn(), // Mock the 'on' method to handle events like 'error'
      disconnect: () => Promise.resolve(),
    };
  },
}));
