import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { firebaseApp } from "../../firebase";
import { getAuth, signOut } from "firebase/auth";
import "./index.css";

const auth = getAuth(firebaseApp);

const Navbar = () => {
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/groups">Groups</Link>
        </li>
        <li>
          <Link to="/friends">Friends</Link>
        </li>
      </ul>
      <ul>
        <li>
          <button onClick={logout} type="button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
