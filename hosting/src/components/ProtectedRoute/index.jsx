import { firebaseApp } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Outlet } from "react-router-dom";
import Login from "../Login";

const auth = getAuth(firebaseApp);

const AuthRequired = () => {
  return <Login />;
};

export default AuthRequired;
