import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import parse from "html-react-parser";

import AppUrl from "../../restApi/AppUrl";
import RestClient from "../../restApi/RestClient";
import Loading from "../Loading/Loading";
import WentWrong from "../WentWrong/WentWrong";

export class TermsDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      informationTermsDescription: "",
      isLoading: true,
      isEorror: false,
    };
  }

  componentDidMount() {
    RestClient.GetRequest(AppUrl.Information)
      .then((data) => {
        this.setState({
          informationTermsDescription:
            data["data"][0].informationTermsDescription,
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
      <Container className="mt-5">
        <Row>
          <Col lg={12} md={12} sm={12}>
            {parse(this.state.informationTermsDescription)}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TermsDescription;
