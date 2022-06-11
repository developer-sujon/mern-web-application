//external imports
import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";

//enternel imports
import coursesOne from "../../assets/images/cources/course-1.jpg";
import coursesTwo from "../../assets/images/cources/course-2.webp";
import coursesThree from "../../assets/images/cources/course-3.jpg";

const CourcesItem = ({ imgUrl, title, description }) => {
  return (
    <Col lg={6} md={12} sm={12} className="p-sm-3 p-md-2">
      <Row>
        <Col lg={6} md={6} sm={12}>
          <img src={imgUrl} alt="cources" className="courseImg" />
        </Col>
        <Col lg={6} md={6} sm={12}>
          <h5 className="text-justify courseTitle">Web Development</h5>
          <p className="text-justify courseDes">
            I build native and cross platfrom mobile app for your business app
            for your business
          </p>
          <a className="courseDetails float-left" href="/">
            Details
          </a>
        </Col>
      </Row>
    </Col>
  );
};

class Cources extends Component {
  render() {
    return (
      <Container className="text-center">
        <h1 className="serviceMainTitle">OUR COURSES</h1>
        <Row>
          <CourcesItem
            imgUrl={coursesOne}
            title="Web Development"
            description="I build native and cross platfrom mobile app for your business app for your business"
          />
          <CourcesItem
            imgUrl={coursesTwo}
            title="Web Development"
            description="I build native and cross platfrom mobile app for your business app for your business"
          />
          <CourcesItem
            imgUrl={coursesThree}
            title="Web Development"
            description="I build native and cross platfrom mobile app for your business app for your business"
          />
          <CourcesItem
            imgUrl={coursesOne}
            title="Web Development"
            description="I build native and cross platfrom mobile app for your business app for your business"
          />
        </Row>
      </Container>
    );
  }
}

export default Cources;
