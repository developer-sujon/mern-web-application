//external imports
import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaFacebook, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";

//enternel imports
class Footer extends Component {
  render() {
    return (
      <>
        <Container fluid={true} className="footerSection text-center">
          <Row>
            <Col
              lg={3}
              md={6}
              sm={12}
              className="p-5"
              style={{ textAlign: "justify" }}
            >
              <h1 className="serviceName">Follow Me</h1>
              <a href="" className="socialLink">
                <FaFacebook />
                &nbsp; Facebook
              </a>
              <br />
              <a href="" className="socialLink">
                <FaGithub />
                &nbsp; Github
              </a>
            </Col>
            <Col
              lg={3}
              md={6}
              sm={12}
              className="p-5"
              style={{ textAlign: "justify" }}
            >
              <h1 className="serviceName">Address</h1>
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
            <Col
              lg={3}
              md={6}
              sm={12}
              className="p-5"
              style={{ textAlign: "justify" }}
            >
              <h1 className="serviceName">Information</h1>
              <a className="footerLink" href="#">
                About Me
              </a>
              <br />
              <a className="footerLink" href="#">
                My Resume
              </a>
              <br />
              <a className="footerLink" href="#">
                Contact Me
              </a>
            </Col>
            <Col
              lg={3}
              md={6}
              sm={12}
              className="p-5"
              style={{ textAlign: "justify" }}
            >
              <h1 className="serviceName">Legal</h1>
              <a className="footerLink" href="#">
                Refund Policy
              </a>
              <br />
              <a className="footerLink" href="#">
                Terms And Condition
              </a>
              <br />
              <a className="footerLink" href="#">
                Privacy Policy
              </a>
            </Col>
          </Row>
        </Container>

        <div className="text-center copyrightSection container-fluid">
          <a className="copyrightLink" href="#">
            Mohamad Sujon © 2019- {new Date().getFullYear()}
          </a>
        </div>
      </>
    );
  }
}

export default Footer;
