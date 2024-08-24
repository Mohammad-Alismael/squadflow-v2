import {
  getDatabase,
  ref,
  child,
  get,
  set,
  push,
  onValue,
  onChildChanged,
  remove,
  onChildAdded,
  onChildMoved,
  off,
} from "firebase/database";
import { app } from "@/lib/firebase-config";

export const writeMessage = async (
  communityId: string,
  workspaceId: string,
  userId: string,
  message: string
) => {
  const db = getDatabase(app);
  const mesRef = ref(db, `communities/${communityId}/${workspaceId}`);
  const newMesRef = push(mesRef);
  await set(newMesRef, {
    created_by: userId,
    text: message,
    timestamp: new Date().getTime(),
  });
};

export const joinLiveChat = async (
  communityId: string,
  workspaceId: string,
  userId: string
) => {
  const db = getDatabase(app);
  const mesRef = ref(
    db,
    `communities/${communityId}/${workspaceId}/connected/${userId}`
  );
  await set(mesRef, {
    userId: userId,
    timestamp: new Date().getTime(),
  });
};

export const leaveLiveChat = async (
  communityId: string,
  workspaceId: string,
  userId: string
) => {
  const db = getDatabase(app);
  const mesRef = ref(
    db,
    `communities/${communityId}/${workspaceId}/connected/${userId}`
  );
  await remove(mesRef);
};

export const getActiveUser = (
  communityId: string,
  workspaceId: string,
  callback: (userData: any) => void
) => {
  const db = getDatabase(app);
  const mesRef = ref(db, `communities/${communityId}/${workspaceId}/connected`);

  const listener = onValue(mesRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const keys = Object.keys(data);
      const activeUsers = keys.map((key) => ({
        userId: data[key]["userId"],
        timestamp: data[key]["timestamp"],
      }));
      callback(activeUsers);
    } else callback([]);
  });
  // Return a cleanup function
  return () => {
    off(mesRef, "value", listener);
  };
};
