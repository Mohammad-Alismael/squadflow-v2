// @ts-nocheck

import mongoose, { Mongoose } from "mongoose";

global.mongoose = {
  conn: null,
  promise: null,
};

export async function connectMongoDB() {
  try {
    if (global.mongoose && global.mongoose.conn) {
      console.log("Connected from previous");
      return global.mongoose.conn;
    } else {
      const promise = mongoose.connect(process.env.MONGODB_URI, {
        autoIndex: true,
        dbName: "users5000",
      });

      global.mongoose = {
        conn: await promise,
        promise,
      };

      console.log("Newly connected");
      return await promise;
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Database connection failed");
  }
}
