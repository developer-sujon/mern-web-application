//external imports
import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import parse from "html-react-parser";

import AppUrl from "../../restApi/AppUrl";
import RestClient from "../../restApi/RestClient";
import Loading from "../Loading/Loading";
import WentWrong from "../WentWrong/WentWrong";
import NotFound from "../NotFound/NotFound";

class Analysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      chartDescription: "",
      isLoading: true,
      isEorror: false,
    };
  }

  componentDidMount() {
    RestClient.GetRequest(AppUrl.SelectAllChart)
      .then((data) => {
        this.setState({
          data: data["data"],
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

    RestClient.GetRequest(AppUrl.HomeEtc)
      .then((data) => {
        this.setState({
          chartDescription: data["data"][0].chartDescription,
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
    } else if (!this.state.data) {
      return <NotFound />;
    } else {
      return (
        <>
          <Container className="text-center">
            <h1 className="serviceMainTitle">Technology Used</h1>
            <Row>
              <Col xl={6} md={12} sm={12}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart width={100} height={300} data={this.state.data}>
                    <XAxis dataKey="chartXData" />
                    <Tooltip />
                    <Bar dataKey="chartYData" fill="#0073e6" />
                  </BarChart>
                </ResponsiveContainer>
              </Col>
              <Col xl={6} md={12} sm={12}>
                {parse(this.state.chartDescription)}
              </Col>
            </Row>
          </Container>
        </>
      );
    }
  }
}

export default Analysis;
