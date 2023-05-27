import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

function GroupList(props) {
  const { details, deleteGroup } = props;
  const { groupName, groupMembers, groupId } = details;

  const handleDeleteClick = () => {
    deleteGroup(groupId);
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
}

export default GroupList;
