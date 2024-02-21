import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  limit,
  doc,
  getDoc,
} from "firebase/firestore";
import { httpsCallable } from "firebase/functions";

import { db, functions } from "../../utils/config/firebase.config";
import { storeData } from "../../utils/localStorage";

const addSearchList = httpsCallable(functions, "users-addSearchList");

const handleLogin = async (email: string, password: string) => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userDocRef = doc(db, "users", userCredential.user.uid); // Adjust the collection name and path
    const userDocSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      const userObject = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        photoURL: userData.photoURL,
        username: userData.username,
        searchList: userData.searchList,
        communityId: userData.communityId,
      };
      await storeData(userObject);
      return userObject;
    }
  } catch (error) {
    throw error;
  }
};

const addSearchListFn = async (username: string) => {
  try {
    await addSearchList({
      displayName: username,
      firstName: "",
      lastName: "",
      username,
    });
  } catch (e) {
    console.log(e);
  }
};
const handleSignUp = async (
  email: string,
  username: string,
  password: string
) => {
  const auth = getAuth();
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await addSearchListFn(username);
  } catch (error) {
    throw error;
  }
};
const handlePasswordReset = async (email: string) => {
  try {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};

const searchByUsername = async (searchText: string) => {
  try {
    const q = query(
      collection(db, "users"),
      where("searchList", "array-contains", searchText)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      user_id: doc.id,
      username: doc.data().username,
    }));
  } catch (error) {
    console.error("Error occurred during username search:", error);
    // Handle the error accordingly, e.g., display an error message or fallback behavior
    return [];
  }
};

export { handleLogin, handleSignUp, handlePasswordReset, searchByUsername };
