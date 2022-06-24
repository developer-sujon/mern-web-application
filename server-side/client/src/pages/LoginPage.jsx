import React from "react";
import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import {
  errorMessage,
  successMessage,
} from "../helper/ToastMessage/ToastMessage";
import { isEmpty } from "../helper/Validation/Validation";
import User from "../Services/auth.services";
const LoginPage = () => {
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const findFormErrors = () => {
    const { userName, password } = form;
    const newErrors = {};

    if (isEmpty(userName)) {
      newErrors.userName = "User Name cannot be blank!";
    }
    if (isEmpty(password)) {
      newErrors.password = "Password cannot be blank!";
    }

    return newErrors;
  };

  const submitFrom = (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      User.Login(form)
        .then((data) => {
          if (data.status === 200) {
            const token = data["data"].token;
            sessionStorage.setItem("token", token);
            successMessage("Login Successfull");
          } else {
            errorMessage("Authorization Credential");
          }
        })
        .catch((err) => {
          console.log(err);
          errorMessage("Authorization Credential");
        });
    }
  };

  return (
    <Container className="py-5 my-5">
      <Row>
        <Col md={6} className="offset-3">
          <h2>Login Page</h2>
          <Form onSubmit={submitFrom}>
            <Form.Group className="mb-3" controlId="userName">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="User Name"
                onChange={(e) => setField("userName", e.target.value)}
                isInvalid={!!errors.userName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.userName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setField("password", e.target.value)}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
