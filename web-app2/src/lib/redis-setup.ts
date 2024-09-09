import "server-only";
import { createClient, RedisClientType } from "redis";

// Define a variable to hold the Redis client instance
let redisClient: RedisClientType | null = null;

// Create or get the Redis client instance
export async function getRedisClient(): Promise<RedisClientType> {
  if (!redisClient) {
    redisClient = createClient({
      url: process.env.CUSTOM_REDIS as string,
    });

    // Handle Redis connection errors
    redisClient.on("error", (err) => {
      console.error("Redis Client Error", err);
    });

    // Connect and return the client
    await redisClient.connect();
    return redisClient!;
  }

  // If the client already exists, return it
  return Promise.resolve(redisClient);
}
