import ListGroup from "react-bootstrap/ListGroup";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { getGroupData, getUserData, deleteGroup } from "../db";
import { useEffect, useState } from "react";

const GroupDetails = () => {
  const { id } = useParams();
  const [groupData, setGroupData] = useState({
    groupName: "",
    groupMembers: [],
    groupId: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchGroupData();
  }, []);

  const fetchGroupData = async () => {
    const data = await getGroupData(id);
    setGroupData(data);
  };

  const { groupName, groupMembers, groupId } = groupData;

  const handleDeleteClick = async () => {
    await deleteGroup(groupId);
    navigate("/groups");
  };

  return (
    <ListGroup className="mt-4">
      <ListGroup.Item>
        <h1>{groupName}</h1>
      </ListGroup.Item>
      {groupMembers.map((member) => (
        <ListGroup.Item key={uuidv4()} variant="primary">
          {member}
        </ListGroup.Item>
      ))}

      <Button
        className="w-100 mt-3"
        variant="danger"
        onClick={handleDeleteClick}
      >
        Delete Group
      </Button>
    </ListGroup>
  );
};

export default GroupDetails;
