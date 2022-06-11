//external imports
import React, { Component } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";

class TopBanner extends Component {
  render() {
    return (
      <Container className="topBanner p-0 " fluid={true}>
        <div className="topBannerOverlay d-flex align-items-center">
          <Container className="topBannerContent ">
            <Row>
              <Col>
                <h1 className="topBannerTitle">SOFTWARE ENGINEER</h1>
                <h4 className="topBannerSubTitle">Mobile & Web Application</h4>
                <Button>More Info</Button>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    );
  }
}

export default TopBanner;
