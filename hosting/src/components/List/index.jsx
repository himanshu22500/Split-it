import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

const ListOptions = (props) => {
  const { mainHead, items } = props;
  return (
    <div className="list-component">
      <h2>{mainHead}</h2>
      <ul>
        {items.map((item) => (
          <li key={uuidv4()}>
            <Link to={item.path}>{item.action}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListOptions;
