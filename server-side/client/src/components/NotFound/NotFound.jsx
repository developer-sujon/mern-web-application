import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NotFoundImg from "../../Assets/img/NotFount.webp";

export class NotFound extends Component {
  render() {
    return (
      <Container className="text-center">
        <Row>
          <Col>
            <img
              src={NotFoundImg}
              alt="Loading"
              style={{ maxWidth: "280px" }}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NotFound;
