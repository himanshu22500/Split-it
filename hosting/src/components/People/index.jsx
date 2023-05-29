import { Button } from "react-bootstrap";

function People(props) {
  const { friend, index, deleteFriend } = props;
  const { friendId } = friend;

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{friend.name}</td>
      <td>{friend.money}</td>
      <td>
        <Button variant="primary">Settle</Button>{" "}
      </td>
    </tr>
  );
}

export default People;
