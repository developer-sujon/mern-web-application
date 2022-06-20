//external imports
import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//enternel imports
import RestClient from "../../restApi/RestClient";
import AppUrl from "../../restApi/AppUrl";
import Loading from "../Loading/Loading";
import WentWrong from "../WentWrong/WentWrong";
import NotFound from "../NotFound/NotFound";

const SliderItem = ({ imgUrl, title, description }) => {
  return (
    <>
      <img className="circleImg" src={imgUrl} alt="clientImg" />
      <h1 className="serviceName">{title}</h1>
      <p className="serviceDescription">{description}</p>
    </>
  );
};

class ClientReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testmonialData: [],
      isLoading: true,
      isEorror: false,
    };
  }

  componentDidMount() {
    RestClient.GetRequest(AppUrl.SelectAllTestmonial)
      .then((data) => {
        this.setState({
          testmonialData: data["data"],
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

    const myServicesView =
      this.state.testmonialData &&
      this.state.testmonialData.map((data) => {
        return (
          <SliderItem
            key={data._id}
            imgUrl={data.testmonialThumbnail}
            title={data.testmonialName}
            description={data.testmonialName}
          />
        );
      });

    if (this.state.isLoading === true) {
      return <Loading />;
    } else if (this.state.isEorror === true) {
      return <WentWrong />;
    } else if (!this.state.testmonialData) {
      return <NotFound />;
    }

    return (
      <Container className="text-center">
        <h1 className="serviceMainTitle">CLIENT SAYS</h1>
        <Row className="justify-content-center">
          <Col lg={6} md={6} sm={12}>
            <Slider {...settings}>{myServicesView}</Slider>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ClientReview;
