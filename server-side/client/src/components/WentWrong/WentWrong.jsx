import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Error from "../../Assets/img/error.svg";

export class WentWrong extends Component {
  render() {
    return (
      <Container className="text-center">
        <Row>
          <Col>
            <img src={Error} alt="WentWrong" style={{ maxWidth: "180px" }} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default WentWrong;
