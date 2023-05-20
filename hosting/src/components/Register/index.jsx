import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { firebaseApp } from "../../firebase";
import { AuthErrorCodes } from "firebase/auth";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import "./index.css";

const auth = getAuth(firebaseApp);

const RegisterUserPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setconfPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    monitorAuthState();
  }, []);

  const monitorAuthState = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      }
    });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfPasswordChange = (e) => {
    setconfPassword(e.target.value);
  };

  const setCustomLoginError = (error) => {
    if (error.code == AuthErrorCodes.WEAK_PASSWORD) {
      setError(`Password should be at least 6 characters`);
    } else {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password != confPassword) {
        throw new Error("Password Do not match");
      }
      await createUserWithEmailAndPassword(auth, email, password);
      setLoading(true);
      navigate("/home/");
    } catch (error) {
      console.log(error);
      setCustomLoginError(error);
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
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
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
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  onChange={handleConfPasswordChange}
                  required
                />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-4" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </Container>
  );
};

export default RegisterUserPage;
