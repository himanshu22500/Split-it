import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";

function FriendList(props) {
  const { friend, index, deleteFriend } = props;
  const { friendId } = friend;

  const handleDeleteClick = async () => {
    deleteFriend(friendId);
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{friend.name}</td>
      <td>{friend.money}</td>
      <td>
        <Button variant="primary">Settle</Button>{" "}
      </td>
      <td>
        <Button variant="danger" onClick={handleDeleteClick}>
          Delete
        </Button>{" "}
      </td>
    </tr>
  );
}

export default FriendList;
