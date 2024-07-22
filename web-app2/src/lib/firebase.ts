import "server-only";
import { getDatabase } from "firebase-admin/database";
import { getDownloadURL, getStorage } from "firebase-admin/storage";

export const writeText = async (userId: string, text: string) => {
  const db = getDatabase();
  await db.ref("users2/" + userId).set({
    text,
  });
};

const bucket = getStorage().bucket();
export async function uploadFile(file: Buffer, fileName: string) {
  try {
    const fileRef = bucket.file(fileName);
    await fileRef.save(file);
    const downloadURL = await getDownloadURL(fileRef);
    console.log("File uploaded successfully");
    return downloadURL; // Return the file path for the client to get the download URL
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
}
