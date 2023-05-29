import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import People from "../People";
import { v4 as uuidv4 } from "uuid";

const PeopleList = (props) => {
  const { groupMembers } = props;
  return (
    <Container
      className="d-flex p-4 align-items-start justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: " 400px" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Money</th>
              <th>Settle</th>
            </tr>
          </thead>
          <tbody>
            {groupMembers.map((friend, index) => (
              <People key={uuidv4()} friend={friend} index={index} />
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-center">
          <Link to="/friends/new">
            <Button>+</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default PeopleList;
