import { Container, Table, Button } from "react-bootstrap";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "../../firebase";
import { deleteGroup, getUserData, setUserData } from "../db";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Group from "../Group";

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
    const { groups } = userData;
    setGroupList(groups);
  };

  return (
    <>
      <Container
        className="d-flex p-4 align-items-start justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <h1 className="text-center">Groups </h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {console.log(groupList)}
              {groupList.map((groupDetails, index) => (
                <Group groupDetails={groupDetails} index={index} key={index} />
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-center">
            <Link to="/groups/new">
              <Button className="w-100 mt-2">+</Button>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Groups;
