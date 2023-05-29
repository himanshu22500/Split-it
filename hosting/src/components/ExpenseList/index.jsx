import { Container, Table, Button } from "react-bootstrap";
import Expense from "../Expense";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const ExpenseList = (props) => {
  const { groupExpense, urlId } = props;
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
              <th>Amount</th>
              <th>Paid By</th>
            </tr>
          </thead>
          <tbody>
            {groupExpense.map((expense, index) => (
              <Expense
                key={uuidv4()}
                expense={expense}
                index={index}
                urlId={urlId}
              />
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-center">
          <Link to={`/groups/${urlId}/expense`}>
            <Button>+</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default ExpenseList;
