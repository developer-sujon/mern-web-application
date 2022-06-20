//external imports
import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import CountUp from "react-countup";
import RestClient from "../../restApi/RestClient";
import AppUrl from "../../restApi/AppUrl";
import Loading from "../Loading/Loading";
import WentWrong from "../WentWrong/WentWrong";

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalProjects: 0,
      homeTotalClient: 0,
      isLoading: true,
      isEorror: false,
    };
  }

  componentDidMount() {
    RestClient.GetRequest(AppUrl.HomeEtc)
      .then((data) => {
        this.setState({
          totalProjects: data["data"][0].homeTotalProject,
          homeTotalClient: data["data"][0].homeTotalClient,
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
      <Container className="summaryBanner p-0 summarySection" fluid={true}>
        <div className="summaryBannerOverlay">
          <Container className="summaryBannerContent ">
            <Row className="align-items-center">
              <Col xl={8} md={6} sm={12}>
                <Row className="countSection">
                  <Col>
                    <h1 className="countNumber">
                      <span>
                        <CountUp end={this.state.totalProjects} />
                      </span>
                    </h1>
                    <h4 className="countTitle">Total Projects</h4>
                    <hr className="bg-white w-25"></hr>
                  </Col>
                  <Col>
                    <h1 className="countNumber">
                      <span>
                        <CountUp end={this.state.homeTotalClient} />
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
