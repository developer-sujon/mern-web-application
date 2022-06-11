//external imports
import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import CountUp from "react-countup";

class Summary extends Component {
  render() {
    return (
      <Container className="summaryBanner p-0 summarySection" fluid={true}>
        <div className="summaryBannerOverlay">
          <Container className="summaryBannerContent ">
            <Row className="align-items-center">
              <Col xl={8} md={6} sm={12}>
                <Row className="countSection">
                  <Col>
                    <h1 className="countNumber">
                      <span>
                        <CountUp end={100} />
                      </span>
                    </h1>
                    <h4 className="countTitle">Total Projects</h4>
                    <hr className="bg-white w-25"></hr>
                  </Col>
                  <Col>
                    <h1 className="countNumber">
                      <span>
                        <CountUp end={100} />
                      </span>
                    </h1>
                    <h4 className="countTitle">Total Clients</h4>
                    <hr className="bg-white w-25"></hr>
                  </Col>
                </Row>
              </Col>
              <Col xl={4} md={6} sm={12}>
                <div className="workCard card">
                  <div className="card-body">
                    <div className="cardTitle text-start card-title h5">
                      How i Work
                    </div>
                    <p className="card-text" />
                    <p className="cardSubTitle text-justify">
                      <FaCheckCircle className="iconBullet" />
                      &nbsp; Requirement Gathering
                    </p>
                    <p className="cardSubTitle text-justify">
                      <FaCheckCircle className="iconBullet" />
                      &nbsp; System Analysis
                    </p>
                    <p className="cardSubTitle text-justify">
                      <FaCheckCircle className="iconBullet" />
                      &nbsp; Coding Testing
                    </p>
                    <p className="cardSubTitle text-justify">
                      <FaCheckCircle className="iconBullet" />
                      &nbsp; Implementation
                    </p>
                    <p />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    );
  }
}

export default Summary;
