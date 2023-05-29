import ListGroup from "react-bootstrap/ListGroup";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { getGroupData, deleteGroup } from "../db";
import { useEffect, useState } from "react";
import PeopleList from "../PeopleList";
import ExpenseList from "../ExpenseList";

const GroupDetails = () => {
  const { id } = useParams();
  const [groupData, setGroupData] = useState({
    groupName: "",
    groupMembers: [],
    groupId: "",
    groupExpense: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchGroupData();
  }, []);

  const fetchGroupData = async () => {
    const data = await getGroupData(id);
    setGroupData(data);
  };

  const { groupName, groupMembers, groupId, totalMoneySpent, groupExpense } =
    groupData;

  const handleDeleteClick = async () => {
    await deleteGroup(groupId);
    navigate("/groups");
  };

  return (
    <div className="text-center">
      <div>
        <h1>{groupName}</h1>
        <h2>Total Money Spent : {totalMoneySpent}</h2>
      </div>
      <div className="d-flex justify-content-between">
        <div class="flex-grow-1"></div>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <h2>People</h2>
          <PeopleList groupMembers={groupMembers} />
        </div>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <h2>Expenses</h2>
          <ExpenseList groupExpense={groupExpense} urlId={id} />
        </div>
        <div class="flex-grow-1"></div>
      </div>
    </div>
  );
};

export default GroupDetails;
