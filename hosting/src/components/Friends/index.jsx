import Table from "react-bootstrap/Table";
import { Container, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "../../firebase";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteFriend, getUserData } from "../db";
import Friend from "../Friend";

const Friends = () => {
  const [friendList, setFriendList] = useState([]);

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
    getFriendsList();
  }, []);

  const getFriendsList = async () => {
    try {
      const userData = await getUserData();
      const { friends } = userData;
      console.log(userData);
      console.log(friends);
      setFriendList(friends);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteFriendAndUpdate = async (id) => {
    await deleteFriend(id);
    getFriendsList();
  };

  return (
    <>
      <Container
        className="d-flex p-4 align-items-start justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Money</th>
                <th>Settle</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {friendList.map((friend, index) => (
                <Friend
                  key={uuidv4()}
                  friend={friend}
                  index={index}
                  deleteFriend={deleteFriendAndUpdate}
                />
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-center">
            <Link to="/friends/new">
              <Button>+</Button>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Friends;
