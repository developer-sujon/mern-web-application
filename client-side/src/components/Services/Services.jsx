//external imports
import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";

//enternel imports
import RestClient from "../../restApi/RestClient";
import AppUrl from "../../restApi/AppUrl";
import Loading from "../Loading/Loading";
import WentWrong from "../WentWrong/WentWrong";
import NotFound from "../NotFound/NotFound";

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
  constructor(props) {
    super(props);
    this.state = {
      servicesData: [],
      isLoading: true,
      isEorror: false,
    };
  }

  componentDidMount() {
    RestClient.GetRequest(AppUrl.SelectAllService)
      .then((data) => {
        this.setState({
          servicesData: data["data"],
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
    const myServicesView =
      this.state.servicesData &&
      this.state.servicesData.map((data) => {
        return (
          <ServiceCard
            key={data._id}
            imgUrl={data.serviceThumbnail}
            title={data.serviceName}
            description={data.serviceDescription}
          />
        );
      });

    if (this.state.isLoading === true) {
      return <Loading />;
    } else if (this.state.isEorror === true) {
      return <WentWrong />;
    } else if (!this.state.servicesData) {
      return <NotFound />;
    }

    return (
      <Container className="text-center">
        <h1 className="serviceMainTitle">MY SERVICES</h1>
        <Row>{myServicesView}</Row>
      </Container>
    );
  }
}

export default Services;
