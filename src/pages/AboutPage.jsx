//external imports
import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";

//enternel imports
import PageTop from "../components/PageTop/PageTop";

class AboutPage extends Component {
  componentDidMount = () => {
    window.scroll(0, 0);
  };

  render() {
    return (
      <>
        <PageTop pagetitle="About Me" />
        <Container className="mt-5">
          <Row>
            <Col lg={12} md={12} sm={12}>
              <h1 className="serviceName">Who i AM</h1>
              <hr />
              <p className="serviceDescription">
                I am a highly talented, experienced, professional and
                cooperative software engineer, I am working in programming and
                web world for more than 4 years .I assure you a wide range of
                quality IT services. Web development, mobile app development and
                UI design the major filed i am expert in. Moreover i have
                teaching passion. I makes video tutorial to share my knowledge.
                My over all skill makes me a complete software developer, so you
                can hire me for your projects
              </p>
              <h1 className="serviceName">My Mission</h1>
              <hr />
              <p className="serviceDescription">
                My mission is to develop unique idea and quality software that
                will secure top ranking in marketplace, people's system and
                people's heart. Develop robust, secure, dynamic, responsive
                software for all platform (computer, tab, mobile phone). Provide
                top notch customer service, customization of our product
                according to customer demand and current technology. Planning
                advanced techniques for optimization, user experience and
                satisfaction of customer for our software. Planning flexible
                software that will not be bounded by any linguistic or regional
                restriction. I want to flourish software that can blow people's
                heart and soul
              </p>
              <h1 className="serviceName">My Vision</h1>
              <hr />
              <p className="serviceDescription">
                My vision is to brand our firm as the best firm in the world.
                Secure the top place among software providers for both local and
                international market. Brand our country as the best software
                provider country. Create employment for youth on the field of
                both software and corporate level. Provide our country and world
                with superior software. Nurture youths to be highly skilled
                software engineers
              </p>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default AboutPage;
