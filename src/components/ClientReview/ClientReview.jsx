//external imports
import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//enternel imports
import ClientOne from "../../assets/images/client/client-1.png";
import ClientTwo from "../../assets/images/client/client-2.png";
import ClientThree from "../../assets/images/client/client-3.png";

const SliderItem = ({ imgUrl, title, description }) => {
  return (
    <>
      <img className="circleImg" src={imgUrl} />
      <h1 className="serviceName">{title}</h1>
      <p className="serviceDescription">{description}</p>
    </>
  );
};

class ClientReview extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      vertical: true,
      verticalSwiping: true,
      autoplay: true,
    };

    return (
      <Container className="text-center">
        <h1 className="serviceMainTitle">CLIENT SAYS</h1>
        <Row className="justify-content-center">
          <Col lg={6} md={6} sm={12}>
            <Slider {...settings}>
              <SliderItem
                imgUrl={ClientOne}
                title="Web Development"
                description="irst i analysis the requirement of project. According to the requirement i make a proper technical analysis, then i build a software architecture. According to the planning i start coding"
              />
              <SliderItem
                imgUrl={ClientTwo}
                title="Web Development"
                description="irst i analysis the requirement of project. According to the requirement i make a proper technical analysis, then i build a software architecture. According to the planning i start coding"
              />
              <SliderItem
                imgUrl={ClientThree}
                title="Web Development"
                description="irst i analysis the requirement of project. According to the requirement i make a proper technical analysis, then i build a software architecture. According to the planning i start coding"
              />
            </Slider>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ClientReview;
