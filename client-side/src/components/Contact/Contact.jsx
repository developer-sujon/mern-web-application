//external imports
import React, { Component } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { Error, Success } from "../../helper/ToastMessage/ToastMessage";
import { isEmpty } from "../../helper/Validation/Validaion";
import AppUrl from "../../restApi/AppUrl";
import RestClient from "../../restApi/RestClient";
import Loading from "../Loading/Loading";
import WentWrong from "../WentWrong/WentWrong";

//enternel imports
export class Contact extends Component {
  state = {
    contactName: "",
    contactEmail: "",
    contactMessage: "",
    isLoading: true,
    isEorror: false,
    footerAddress: "...",
    footerEmail: "...",
    footerPhone: "...",
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitForm(e) {
    e.preventDefault();

    const { contactName, contactEmail, contactMessage } = this.state;

    if (isEmpty(contactName)) {
      Error("Name is Required");
    } else if (isEmpty(contactEmail)) {
      Error("Email is Required");
    } else if (isEmpty(contactMessage)) {
      Error("Message is Required");
    } else {
      RestClient.PostRequest(AppUrl.SendMessage, this.state)
        .then((response) => Success("Message Send Successfull"))
        .catch((err) => Error("Message not Send"));
    }
  }

  componentDidMount() {
    RestClient.GetRequest(AppUrl.Footer)
      .then((data) => {
        this.setState({
          footerAddress: data["data"][0].footerAddress,
          footerEmail: data["data"][0].footerEmail,
          footerPhone: data["data"][0].footerPhone,
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
      <Container className="mt-5">
        <Row>
          <Col lg={6} md={6} sm={12}>
            <h1 className="serviceName">Quick Connect</h1>
            <Form onSubmit={this.submitForm.bind(this)}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  name="contactName"
                  value={this.state.contactName}
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="contactEmail"
                  placeholder="Enter Email"
                  value={this.state.contactEmail}
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Leave a Message here"
                  style={{ height: "100px" }}
                  name="contactMessage"
                  value={this.state.contactMessage}
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>

          <Col lg={6} md={6} sm={12}>
            <h1 className="serviceName">Discuss Now</h1>
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
        </Row>
      </Container>
    );
  }
}

export default Contact;
