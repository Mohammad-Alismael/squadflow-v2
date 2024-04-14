import { isAdminUserId, getTheOldestMember } from "@/lib/community.helper";

describe("getTheOldestMember", () => {
  // Should return the user with the oldest joined_at date when given a list of participants with valid dates
  it("should return the user with the oldest joined_at date when given a list of participants with valid dates", () => {
    const participants = [
      { user: "user1", joined_at: new Date("2022-01-01") },
      { user: "user2", joined_at: new Date("2021-01-01") },
      { user: "user3", joined_at: new Date("2023-01-01") },
    ];
    const oldestMember = getTheOldestMember(participants);
    expect(oldestMember).toBe("user2");
  });

  // Should return the only user in the list when given a list with only one participant
  it("should return the only user in the list when given a list with only one participant", () => {
    const participants = [{ user: "user1", joined_at: new Date("2022-01-01") }];
    const oldestMember = getTheOldestMember(participants);
    expect(oldestMember).toBe("user1");
  });

  // Should return the user with the oldest joined_at date when given a list of participants with the same joined_at date
  it("should return the user with the oldest joined_at date when given a list of participants with the same joined_at date", () => {
    const participants = [
      { user: "user1", joined_at: new Date("2022-01-01") },
      { user: "user2", joined_at: new Date("2022-01-01") },
      { user: "user3", joined_at: new Date("2022-01-01") },
    ];
    const oldestMember = getTheOldestMember(participants);
    expect(oldestMember).toBe("user1");
  });

  // Should raise an error when given an empty list of participants
  it("should raise an error when given an empty list of participants", () => {
    const participants = [];
    expect(getTheOldestMember(participants)).toBeNull();
  });

  // Should raise an error when given a list of participants with invalid or missing joined_at dates
  it("should raise an error when given a list of participants with invalid or missing joined_at dates", () => {
    const participants = [
      { user: "user1", joined_at: new Date("2022-01-01") },
      { user: "user2", joined_at: "invalid date" },
      { user: "user3" },
    ];
    expect(() => getTheOldestMember(participants)).toThrowError();
  });

  // Should return the first user in the list when given a list of participants with the same joined_at date and same user
  it("should return the first user in the list when given a list of participants with the same joined_at date and same user", () => {
    const participants = [
      { user: "user1", joined_at: new Date("2022-01-01") },
      { user: "user1", joined_at: new Date("2022-01-01") },
      { user: "user1", joined_at: new Date("2022-01-01") },
    ];
    const oldestMember = getTheOldestMember(participants);
    expect(oldestMember).toBe("user1");
  });

  // Should handle participants with null or undefined values for joined_at date
  it("should handle participants with null or undefined values for joined_at date", () => {
    const participants = [
      { user: "user1", joined_at: null },
      { user: "user2", joined_at: undefined },
      { user: "user3", joined_at: new Date("2022-01-01") },
    ];
    expect(() => getTheOldestMember(participants)).toThrowError();
  });
});

describe("isAdminUserId", () => {
  // The function returns true when the admin and user ids are the same.
  it("should return true when admin and user ids are the same", () => {
    const admin = "5f7f9e8d9c6b4a3e2d1f0e9d";
    const userId = "5f7f9e8d9c6b4a3e2d1f0e9d";

    const result = isAdminUserId(admin, userId);

    expect(result).toBe(true);
  });

  // The function returns false when the admin and user ids are different.
  it("should return false when admin and user ids are different", () => {
    const admin = "5f7f9e8d9c6b4a3e2d1f0e9d";
    const userId = "5f7f9e8d9c6b4a3e2d1f0e9c";

    const result = isAdminUserId(admin, userId);

    expect(result).toBe(false);
  });

  // The function throws an error when the admin id is not a valid ObjectId.
  it("should throw an error when admin id is not a valid ObjectId", () => {
    const admin = "invalidObjectId";
    const userId = "5f7f9e8d9c6b4a3e2d1f0e9d";

    expect(() => {
      isAdminUserId(admin, userId);
    }).toThrow();
  });

  // The function returns false when the user id is not a valid ObjectId.
  it("should return false when user id is not a valid ObjectId", () => {
    const admin = "5f7f9e8d9c6b4a3e2d1f0e9d";
    const userId = "invalidObjectId";

    expect(() => isAdminUserId(admin, userId)).toThrowError("Invalid ObjectId");
  });

  // The function returns false when the admin id is null or undefined.
  it("should return false when admin id is null", () => {
    const admin = null;
    const userId = "5f7f9e8d9c6b4a3e2d1f0e9d";

    expect(() => isAdminUserId(admin, userId)).toThrowError("Invalid ObjectId");
  });

  // The function returns false when the user id is null or undefined.
  it("should return false when user id is null", () => {
    const admin = "5f7f9e8d9c6b4a3e2d1f0e9d";
    const userId = null;

    expect(() => isAdminUserId(admin, userId)).toThrowError("Invalid ObjectId");
  });

  // The function returns false when the admin id is an empty string.
  it("should return false when admin id is an empty string", () => {
    const admin = "";
    const userId = "5f7f9e8d9c6b4a3e2d1f0e9d";

    expect(() => isAdminUserId(admin, userId)).toThrowError("Invalid ObjectId");
  });

  // The function returns false when the user id is an empty string.
  it("should return false when user id is an empty string", () => {
    const admin = "5f7f9e8d9c6b4a3e2d1f0e9d";
    const userId = "";
    expect(() => isAdminUserId(admin, userId)).toThrowError("Invalid ObjectId");
  });
});
