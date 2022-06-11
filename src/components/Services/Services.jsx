//external imports
import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";

//enternel imports
import web from "../../assets/images/web.svg";
import mobile from "../../assets/images/mobile.svg";
import graphics from "../../assets/images/graphics.svg";

const ServiceCard = ({ imgUrl, title, description }) => {
  return (
    <Col xl={4} md={6} sm={12} className="">
      <div className="serviceCard text-center">
        <img src={imgUrl} alt="" />
        <h2 className="serviceName">{title}</h2>
        <p className="serviceDescription">{description}</p>
      </div>
    </Col>
  );
};

class Services extends Component {
  render() {
    return (
      <Container className="text-center">
        <h1 className="serviceMainTitle">MY SERVICES</h1>
        <Row>
          <ServiceCard
            imgUrl={web}
            title="Web Development"
            description="I design and develop static and dynamic web sites as per your
            requirements as we believe, “web is world’s next home”."
          />
          <ServiceCard
            imgUrl={mobile}
            title="Mobile Development"
            description="I build native and cross platfrom mobile app for your business and instiution as per as your requirements."
          />
          <ServiceCard
            imgUrl={graphics}
            title="Graphics Design"
            description="I desing modern user interface and other graphical components for your business and instiution."
          />
        </Row>
      </Container>
    );
  }
}

export default Services;
