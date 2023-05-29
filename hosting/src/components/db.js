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
export let userEmail = "test@gmail.com";
export let docId = "hkcqOXOw4ZaF41KeszMp";
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
  docId = userData[0].id;
  return userData[0];
};

export const setUserData = async (userData) => {
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
  groups.push({
    groupName,
    groupMembers: inputs,
    groupId: uuidv4(),
    groupExpense: [],
    totalMoneySpent: 0,
  });
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

export const addExpense = async (name, amount, paidBy, id) => {
  let userData = await getUserData();
  let { groups } = userData;
  let groupToChange;
  const restGroups = groups.filter((group) => {
    if (group.groupId === id) {
      groupToChange = group;
    }
    return group.groupId !== id;
  });

  console.log(groupToChange);
  groupToChange.groupExpense.push({
    name,
    amount,
    paidBy,
    expenseId: uuidv4(),
  });

  groupToChange.totalMoneySpent += Number(amount);
  const eachCost = Math.floor(
    Number(amount) / groupToChange.groupMembers.length
  );
  console.log(eachCost);
  const updatedMembers = groupToChange.groupMembers.map((member) => {
    if (member.name === paidBy) {
      return {
        name: member.name,
        money: member.money + eachCost,
      };
    }

    return {
      name: member.name,
      money: member.money - eachCost,
    };
  });

  groupToChange.groupMembers = updatedMembers;

  restGroups.push(groupToChange);
  userData = {
    ...userData,
    groups: restGroups,
  };

  setUserData(userData);
};
