import React, { useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addGroup } from "../db";

const DynamicForm = (props) => {
  const [inputs, setInputs] = useState([""]); // State to store the input values
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle adding more input fields
  const addInput = () => {
    setInputs([...inputs, ""]);
  };

  // Function to handle updating input values
  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addGroup(groupName, inputs);
    navigate("/groups");
    setInputs([""]);
    setGroupName("");
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Add Group</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="groupName">
                <Form.Label>Group Name</Form.Label>
                <Form.Control
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Group Name"
                  className="text-bold"
                  value={groupName}
                  required
                />
              </Form.Group>

              {inputs.map((input, index) => (
                <Form.Group id={index} key={index}>
                  <Form.Control
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    placeholder="Name"
                    className="mt-2 mb-2"
                    value={input}
                  />
                </Form.Group>
              ))}
              <Button onClick={addInput} className="w-100 mt-2">
                More Members
              </Button>
              <Button disabled={loading} className="w-100 mt-3" type="submit">
                Save
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default DynamicForm;
