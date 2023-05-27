import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { db, firebaseApp } from "../../firebase";
import { AuthErrorCodes } from "firebase/auth";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "./index.css";

const auth = getAuth(firebaseApp);

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const monitorAuthState = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      }
    });
  };

  monitorAuthState();

  const setCustomLoginError = (error) => {
    if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
      setLoginError(`Wrong password. Try again.`);
    } else if (error.code == "auth/user-not-found") {
      setLoginError(`Wrong Email. Try again.`);
    } else {
      setLoginError(`Error : ${error.message}`);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      setCustomLoginError(error);
      console.log(`There was an error: ${error}`);
    }

    setLoading(false);
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {loginError && <Alert variant="danger">{loginError}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={handleEmailChange}
                  required
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={handlePasswordChange}
                  required
                />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-4" type="submit">
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </Container>
  );
};

export default Login;
