import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LoadingImg from "../../Assets/img/laoding.svg";

export class Loading extends Component {
  render() {
    return (
      <Container className="text-center">
        <Row>
          <Col>
            <img src={LoadingImg} alt="Loading" />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Loading;
