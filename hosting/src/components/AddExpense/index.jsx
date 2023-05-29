import React, { useEffect, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { addExpense, getGroupData } from "../db";

const AddExpense = (props) => {
  const [name, setName] = useState([""]); // State to store the input values
  const [amount, setAmount] = useState(0);
  const [paidBy, setPaidBy] = useState("");
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getMemberList();
  }, []);

  const getMemberList = async () => {
    const groupData = await getGroupData(id);
    const { groupMembers } = groupData;
    setMembers(groupMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addExpense(name, amount, paidBy, id);
    navigate(`/groups/${id}/`);
    setAmount(0);
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
            <h2 className="text-center mb-4">Add Expense</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="groupName">
                <Form.Label>Expense Name</Form.Label>
                <Form.Control
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Expense Name"
                  className="text-bold"
                  value={name}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount"
                  className="mt-2 mb-2"
                  value={Number(amount)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="font-weight-bold">Paid By</Form.Label>
                <Form.Select
                  onChange={(e) => setPaidBy(e.target.value)}
                  className="mb-2"
                  value={paidBy}
                >
                  <option value="">Select an option</option>
                  {members.map((member, index) => (
                    <option key={index} value={member.name}>
                      {member.name}
                    </option>
                  ))}
                </Form.Select>
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

export default AddExpense;
