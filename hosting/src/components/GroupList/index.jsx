import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

function GroupList(props) {
  const { details, deleteGroup } = props;
  const { name, members, id } = details;

  const handleDeleteClick = () => {
    deleteGroup(id);
  };

  return (
    <ListGroup className="mt-4">
      <ListGroup.Item>
        <h1>{name}</h1>
      </ListGroup.Item>
      {members.map((member) => (
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
