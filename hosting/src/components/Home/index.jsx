import Navbar from "../Navbar";
import ListOptions from "../List";
import { firebaseApp } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./index.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const actions = [
  { action: "Share Link", path: "/share" },
  { action: "Add Friends", path: "/friends/new" },
  { action: "Add Group", path: "/groups/new" },
];

const expense = [
  { action: "Even Distribution", path: "distro" },
  { action: "Uneven Distribution", path: "distro" },
  { action: "Reciept", path: "reciept" },
];

const Home = () => {
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

  return (
    <>
      <ListOptions mainHead="SELECT YOUR ACTION" items={actions} />
      <ListOptions mainHead="SPLIT EXPENSE" items={expense} />
    </>
  );
};
export default Home;
