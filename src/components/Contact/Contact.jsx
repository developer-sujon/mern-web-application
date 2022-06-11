//external imports
import React, { Component } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaEnvelope, FaPhone } from "react-icons/fa";

//enternel imports
export class Contact extends Component {
  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col lg={6} md={6} sm={12}>
            <h1 className="serviceName">Quick Connect</h1>
            <Form>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Leave a Message here"
                  style={{ height: "100px" }}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>

          <Col lg={6} md={6} sm={12}>
            <h1 className="serviceName">Discuss Now</h1>
            <p className="serviceDescription">
              Amjhupi, Amjhupi, Meherpur Sadar, Meherpur 7101
            </p>
            <p className="serviceDescription">
              <FaEnvelope />
              &nbsp; developersujon@yahoo.com
            </p>
            <p className="serviceDescription">
              <FaPhone />
              &nbsp; +8801772703036
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Contact;
