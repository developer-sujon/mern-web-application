import React from "react";
import { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Navbar,
} from "react-bootstrap";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { Link } from "react-router-dom";

import {
  errorMessage,
  successMessage,
} from "../Helper/ToastMessage/ToastMessage";
import { isEmpty } from "../Helper/Validation/Validation";
import RestClient from "../Services/RestClient";

import Logo from "../Assets/img/logo.svg";

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
      RestClient.PostRequest("/user/LoginProfile", form)
        .then((response) => {
          if (response.status === 200) {
            const token = response.data.token;
            sessionStorage.setItem("accessToken", token);
            successMessage("Login Successfull");
            window.location.href = "/";
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
    <>
      <title>Login Page</title>

      <Navbar className="fixed-top px-0 shadow-sm ">
        <Container fluid={true}>
          <Navbar.Brand>
            <button className="icon-nav m-0 h5 btn btn-link">
              <AiOutlineMenuUnfold />
            </button>
            <Link to="/">
              <img className="nav-logo mx-2" src={Logo} alt="logo" />
            </Link>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="py-5 my-5">
        <Row className="justify-content-center ">
          <Col md={7} lg={6} style={{ marginTop: "100px" }}>
            <Card className="card w-90  p-4">
              <Card.Body>
                <h5>Sign In</h5>
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
