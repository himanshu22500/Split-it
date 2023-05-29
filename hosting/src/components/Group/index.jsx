import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { deleteGroup } from "../db";
import { useNavigate } from "react-router-dom";

const Group = (props) => {
  const { groupDetails, index } = props;
  const { groupId, groupName } = groupDetails;
  const navigate = useNavigate();

  const handleDeleteClick = async () => {
    await deleteGroup(groupId);
    navigate("/groups");
  };

  console.log(groupDetails);
  return (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>
        <Link to={`/groups/${groupId}/`}>{groupName}</Link>
      </td>
      <td>
        <Button variant="danger" onClick={handleDeleteClick}>
          Delete
        </Button>{" "}
      </td>
    </tr>
  );
};

export default Group;
