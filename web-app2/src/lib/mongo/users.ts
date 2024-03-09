import clientPromise from "@/lib/db";

const dbName = "squadflow";

// Initialize MongoDB client
async function init() {
  return clientPromise;
}

// Create operation
async function createUser(user) {
  const client = await init();
  try {
    const db = client.db(dbName);
    const result = await db.collection("users").insertOne(user);
    console.log(`User inserted with _id: ${result.insertedId}`);
    return result.insertedId;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

// Read operation for users
async function findUser(query) {
  const client = await init();
  try {
    const db = client.db(dbName);
    const result = await db.collection("users").findOne(query);
    return result;
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
}

// Update operation for users
async function updateUser(filter, update) {
  const client = await init();
  try {
    const db = client.db(dbName);
    const result = await db
      .collection("users")
      .updateOne(filter, { $set: update });
    console.log(
      `User updated: ${result.modifiedCount} document(s) matched the filter, ${result.upsertedCount} document(s) inserted`
    );
    return result.modifiedCount;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

// Delete operation for users
async function deleteUser(filter) {
  const client = await init();
  try {
    const db = client.db(dbName);
    const result = await db.collection("users").deleteOne(filter);
    console.log(
      `User deleted: ${result.deletedCount} document(s) matched the filter`
    );
    return result.deletedCount;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

async function listUsers() {
  const client = await init();
  try {
    const db = client.db(dbName);
    const users = await db.collection("users").find({}).toArray();
    return users;
  } catch (error) {
    console.error("Error listing users:", error);
    throw error;
  }
}

export { createUser, updateUser, deleteUser, listUsers };
