import GroupList from "../GroupList";
import { Container } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "../../firebase";
import { getUserData, setUserData } from "../db";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const getGroupsList = async () => {
    const userData = await getUserData();
    console.log(userData);
    const { groups } = userData;
    console.log(groups);
    setGroupList(groups);
  };

  const deleteGroup = async (id) => {
    const userData = await getUserData();
    const { groups } = userData;
    const updatedGroups = groups.filter((group) => group.groupId !== id);
    const updatedUserData = {
      ...userData,
      groups: updatedGroups,
    };
    await setUserData(updatedUserData, userData.id);
    getGroupsList();
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
