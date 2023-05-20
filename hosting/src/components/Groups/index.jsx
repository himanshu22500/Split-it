import Navbar from "../Navbar";
import GroupList from "../GroupList";
import { Container } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "../../firebase";
import DynamicForm from "../DynamicForm";
import {
  collection,
  getDocs,
  CollectionReference,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GROUP_COLLECTION_PATH } from "../db";

const Groups = () => {
  const [groupList, setGroupList] = useState([]);

  const navigate = useNavigate();
  const auth = getAuth(firebaseApp);
  const monitorAuthState = async () => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });
  };
  monitorAuthState();

  useEffect(() => {
    getGroupsList();
  }, []);

  const groupsCollectionRef = collection(db, GROUP_COLLECTION_PATH);

  const getGroupsList = async () => {
    try {
      const data = await getDocs(groupsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setGroupList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteGroup = async (id) => {
    const groupsDoc = doc(db, GROUP_COLLECTION_PATH, id);

    try {
      await deleteDoc(groupsDoc);
      getGroupsList();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container
        className="d-flex p-4 align-items-start justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          {groupList.map((each) => {
            return (
              <GroupList
                key={uuidv4()}
                deleteGroup={deleteGroup}
                details={each}
              />
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default Groups;
