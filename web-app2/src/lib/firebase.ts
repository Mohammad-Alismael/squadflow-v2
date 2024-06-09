import "server-only";

import { getFirestore } from "firebase-admin/firestore";
import { getDatabase } from "firebase-admin/database";
import { getDownloadURL, getStorage } from "firebase-admin/storage";
import { ref, set } from "@firebase/database";

export const writeText = async (userId: string, text: string) => {
  const db = getDatabase();
  await db.ref("users2/" + userId).set({
    text,
  });
};
