import {
  getDatabase,
  ref,
  child,
  get,
  set,
  push,
  onValue,
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

export const getMessages = () => {};
