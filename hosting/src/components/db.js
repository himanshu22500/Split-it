import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase";

// export const GROUP_COLLECTION_PATH = "/user/user1/Groups";
export const USER_COLLECTION_PATH = "/user";
export const userEmail = "himanshu22500@gmail.com";
export const docId = "UMv486vmK8VZI8JCzbVc";

export const getUserData = async () => {
  const userCollectionRef = collection(db, USER_COLLECTION_PATH);
  const q = query(userCollectionRef, where("Email", "==", userEmail));
  const querySnapshot = await getDocs(q);
  const userData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return userData[0];
};

export const setUserData = async (userData, id) => {
  console.log(id);
  try {
    const docRef = doc(db, `${USER_COLLECTION_PATH}/${docId}`);
    await updateDoc(docRef, {
      ...userData,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addGroup = async (groupName, inputs) => {
  const userData = await getUserData();
  const { groups } = userData;
  groups.push({ groupName, groupMembers: inputs, groupId: uuidv4() });
  try {
    const docRef = doc(db, `${USER_COLLECTION_PATH}/${docId}`);
    await updateDoc(docRef, {
      ...userData,
      groups: groups,
    });
  } catch (err) {
    console.log(err);
  }
};
