//external imports
import React, { Component } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import AppUrl from "../../restApi/AppUrl";
import RestClient from "../../restApi/RestClient";
import Loading from "../Loading/Loading";
import WentWrong from "../WentWrong/WentWrong";

class TopBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeTitle: "...",
      homeSubtitle: "...",
      isLoading: true,
      isEorror: false,
    };
  }

  componentDidMount() {
    RestClient.GetRequest(AppUrl.HomeEtc)
      .then((data) => {
        this.setState({
          homeTitle: data["data"][0].homeTitle,
          homeSubtitle: data["data"][0].homeSubtitle,
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
      return (
        <Container className="topBanner p-0 " fluid={true}>
          <div className="topBannerOverlay d-flex align-items-center">
            <Loading />
          </div>
        </Container>
      );
    } else if (this.state.isEorror === true) {
      return (
        <Container className="topBanner p-0 " fluid={true}>
          <div className="topBannerOverlay d-flex align-items-center">
            <WentWrong />
          </div>
        </Container>
      );
    }

    return (
      <Container className="topBanner p-0 " fluid={true}>
        <div className="topBannerOverlay d-flex align-items-center">
          <Container className="topBannerContent ">
            <Row>
              <Col>
                <h1 className="topBannerTitle">{this.state.homeTitle}</h1>
                <h4 className="topBannerSubTitle">{this.state.homeSubtitle}</h4>
                <Button>More Info</Button>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    );
  }
}

export default TopBanner;
