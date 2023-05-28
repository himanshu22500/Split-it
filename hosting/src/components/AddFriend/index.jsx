import React, { useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addFriend } from "../db";

const AddFriend = (props) => {
  const [name, setName] = useState([""]); // State to store the input values
  const [money, setMoney] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addFriend(name, money);
    navigate("/friends");
    setMoney(0);
    setName("");
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Add Friend</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="groupName">
                <Form.Label>Friend Name</Form.Label>
                <Form.Control
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Friend Name"
                  className="text-bold"
                  value={name}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  onChange={(e) => setMoney(e.target.value)}
                  placeholder="Amount"
                  className="mt-2 mb-2"
                  value={money}
                />
              </Form.Group>

              <Button className="w-100 mt-3" type="submit">
                Add
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default AddFriend;
