//external imports
import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaFacebook, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import AppUrl from "../../restApi/AppUrl";
import RestClient from "../../restApi/RestClient";
import Loading from "../Loading/Loading";
import WentWrong from "../WentWrong/WentWrong";

//enternel imports
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      footerFacebook: "",
      footerGithub: "",
      footerAddress: "",
      footerEmail: "",
      footerPhone: "",
      footerCredit: "",
      isLoading: true,
      isEorror: false,
    };
  }

  componentDidMount() {
    RestClient.GetRequest(AppUrl.Footer)
      .then((data) => {
        this.setState({
          footerFacebook: data["data"][0].footerFacebook,
          footerGithub: data["data"][0].footerGithub,
          footerAddress: data["data"][0].footerAddress,
          footerEmail: data["data"][0].footerEmail,
          footerPhone: data["data"][0].footerPhone,
          footerCredit: data["data"][0].footerCredit,
          isLoading: false,
          isEorror: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
          isEorror: true,
        });
      });
  }

  render() {
    if (this.state.isLoading === true) {
      return <Loading />;
    } else if (this.state.isEorror === true) {
      return <WentWrong />;
    }

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
              <a
                href={this.state.footerFacebook}
                className="socialLink"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebook />
                &nbsp; Facebook
              </a>
              <br />
              <a
                href={this.state.footerGithub}
                className="socialLink"
                target="_blank"
                rel="noreferrer"
              >
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
              <p className="serviceDescription">{this.state.footerAddress}</p>
              <p className="serviceDescription">
                <FaEnvelope />
                &nbsp; {this.state.footerEmail}
              </p>
              <p className="serviceDescription">
                <FaPhone />
                &nbsp; {this.state.footerPhone}
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
              <Link className="footerLink" to="/about">
                About Me
              </Link>
              <br />
              <Link className="footerLink" to="/resume">
                My Resume
              </Link>
              <br />
              <Link className="footerLink" to="/contact">
                Contact Me
              </Link>
            </Col>
            <Col
              lg={3}
              md={6}
              sm={12}
              className="p-5"
              style={{ textAlign: "justify" }}
            >
              <h1 className="serviceName">Legal</h1>
              <Link className="footerLink" to="/refund-policy">
                Refund Policy
              </Link>
              <br />
              <Link className="footerLink" to="/terms">
                Terms And Condition
              </Link>
              <br />
              <Link className="footerLink" to="/privacy-policy">
                Privacy Policy
              </Link>
            </Col>
          </Row>
        </Container>

        <div className="text-center copyrightSection container-fluid">
          <a className="copyrightLink" href="/">
            {this.state.footerCredit} {new Date().getFullYear()}
          </a>
        </div>
      </>
    );
  }
}

export default Footer;
