import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer/Footer";
import PageTop from "../components/PageTop/PageTop";
import TopNavigation from "../components/TopNavigation/TopNavigation";

export class NotFoundPage extends Component {
  componentDidMount = () => {
    window.scroll(0, 0);
  };

  render() {
    return (
      <>
        <TopNavigation pageTitle="Home Page" />
        <PageTop pageTitle="404" />
        <Container className="mt-5 text-center">
          <Row className="align-item-center">
            <Col>
              <h1>404</h1>
            </Col>
          </Row>
        </Container>
        <Footer />
      </>
    );
  }
}

export default NotFoundPage;
