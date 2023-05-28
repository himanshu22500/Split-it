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

export const USER_COLLECTION_PATH = "/user";
export let userEmail;
export let docId;
export const updateDbFetchData = (eml) => {
  userEmail = eml;
  getUserData();
};

export const getUserData = async () => {
  const userCollectionRef = collection(db, USER_COLLECTION_PATH);
  const q = query(userCollectionRef, where("email", "==", userEmail));
  const querySnapshot = await getDocs(q);
  const userData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  console.log(userEmail);
  docId = userData[0].id;
  console.log(docId);
  return userData[0];
};

export const setUserData = async (userData, id) => {
  try {
    const docRef = doc(db, `${USER_COLLECTION_PATH}/${docId}`);
    await updateDoc(docRef, {
      ...userData,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteGroup = async (id) => {
  const userData = await getUserData();
  const { groups } = userData;
  const updatedGroups = groups.filter((group) => group.groupId !== id);
  const updatedUserData = {
    ...userData,
    groups: updatedGroups,
  };
  await setUserData(updatedUserData, userData.id);
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

export const getGroupData = async (id) => {
  const userData = await getUserData();
  const { groups } = userData;
  let groupData;
  groups.forEach((group) => {
    if (group.groupId === id) {
      groupData = group;
    }
  });

  return groupData;
};

export const addFriend = async (name, money) => {
  const userData = await getUserData();
  const { friends } = userData;
  friends.push({ name, money, friendId: uuidv4() });
  try {
    const docRef = doc(db, `${USER_COLLECTION_PATH}/${docId}`);
    await updateDoc(docRef, {
      ...userData,
      friends: friends,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteFriend = async (id) => {
  const userData = await getUserData();
  const { friends } = userData;
  const updatedList = friends.filter((friend) => friend.friendId !== id);
  const updatedUserData = {
    ...userData,
    friends: updatedList,
  };

  await setUserData(updatedUserData, docId);
};
