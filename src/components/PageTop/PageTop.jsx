//external imports
import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";

class PageTop extends Component {
  render() {
    return (
      <>
        <Container fluid={true} className="topFixedPage p-0">
          <div className="topPageOverlay d-flex align-items-center">
            <Container className="topPageContent">
              <Row>
                <Col className="text-center">
                  <h4 className="pageTitle">{this.props.pagetitle}</h4>
                </Col>
              </Row>
            </Container>
          </div>
        </Container>
      </>
    );
  }
}

export default PageTop;
