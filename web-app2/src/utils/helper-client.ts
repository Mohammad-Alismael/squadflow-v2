export enum USER_ROLES {
  viewer = "viewer",
  editor = "editor",
  admin = "admin",
}

export function getRoleValue(roleKey: USER_ROLES): string {
  return USER_ROLES[roleKey];
}

export function safeStringify(obj: any) {
  const seen = new WeakSet();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  });
}
