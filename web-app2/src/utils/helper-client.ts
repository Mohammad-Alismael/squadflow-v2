export enum USER_ROLES {
  viewer = "viewer",
  editor = "editor",
  admin = "admin",
}

export enum WORKSPACE_TABS {
  KANBAN = "kanban",
  CHATS = "chats",
  CALENDAR = "calendar",
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

export const getErrorMessage = (error: unknown): string => {
  let message = "";
  if (error instanceof Error) {
    error = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = String(error);
  } else {
    message = "something went wrong";
  }
  return message;
};
