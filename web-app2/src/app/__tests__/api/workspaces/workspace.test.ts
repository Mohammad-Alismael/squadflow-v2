import { ObjectId } from "mongodb";
import { isUserIdHasRole } from "@/lib/helper/workspace.helper";

describe("isUserIdHasRole", () => {
  // Returns true if the user id is found in participants and has the specified role
  it("should return true when user id is found in participants and has the specified role", () => {
    const participants = [
      { user: new ObjectId(), role: "admin" },
      { user: new ObjectId(), role: "user" },
      { user: new ObjectId(), role: "user" },
    ];
    const userId = participants[0].user;
    const role = "admin";

    const result = isUserIdHasRole(participants, userId, role);

    expect(result).toBe(true);
  });

  // Returns false if the user id is found in participants but does not have the specified role
  it("should return false when user id is found in participants but does not have the specified role", () => {
    const participants = [
      { user: new ObjectId(), role: "admin" },
      { user: new ObjectId(), role: "user" },
      { user: new ObjectId(), role: "user" },
    ];
    const userId = participants[0].user;
    const role = "user";

    const result = isUserIdHasRole(participants, userId, role);

    expect(result).toBe(false);
  });

  // Throws an error if the user id is not found in participants
  it("should throw an error when user id is not found in participants", () => {
    const participants = [
      { user: new ObjectId(), role: "admin" },
      { user: new ObjectId(), role: "user" },
      { user: new ObjectId(), role: "user" },
    ];
    const userId = new ObjectId();
    const role = "admin";

    expect(() => {
      isUserIdHasRole(participants, userId, role);
    }).toThrowError("user id not found in participants");
  });

  // Returns false if participants is an empty array
  it("should return false when participants is an empty array", () => {
    const participants = [];
    const userId = new ObjectId();
    const role = "admin";

    const result = isUserIdHasRole(participants, userId, role);

    expect(result).toBe(false);
  });

  // Returns false if the user id is not a valid ObjectId
  it("should return false when user id is not a valid ObjectId", () => {
    const participants = [
      { user: new ObjectId(), role: "admin" },
      { user: new ObjectId(), role: "user" },
      { user: new ObjectId(), role: "user" },
    ];
    const userId = "invalidId";
    const role = "admin";

    const result = isUserIdHasRole(participants, userId, role);

    expect(result).toBe(false);
  });

  // Returns false if the role is not a string
  it("should return false when the role is not a string", () => {
    const participants = [
      { user: new ObjectId(), role: "admin" },
      { user: new ObjectId(), role: "user" },
      { user: new ObjectId(), role: "user" },
    ];
    const userId = participants[0].user;
    const role = 123;

    const result = isUserIdHasRole(participants, userId, role);

    expect(result).toBe(false);
  });

  // Returns false if participants array contains an invalid user object
  it("should return false when participants array contains an invalid user object", () => {
    const participants = [
      { user: new ObjectId(), role: "admin" },
      { user: new ObjectId(), role: "user" },
      { user: new ObjectId(), role: "user" },
    ];
    const userId = participants[0].user;
    const role = "user";

    const result = isUserIdHasRole(participants, userId, role);

    expect(result).toBe(false);
  });

  // Returns false if participants array contains a user object without a role
  it("should return false when participants array contains a user object without a role", () => {
    const participants = [
      { user: new ObjectId(), role: "admin" },
      { user: new ObjectId() },
      { user: new ObjectId(), role: "user" },
    ];
    const userId = participants[0].user;
    const role = "admin";

    const result = isUserIdHasRole(participants, userId, role);

    expect(result).toBe(false);
  });
});
