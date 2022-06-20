//external imports
import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

//enternel imports
import Loading from "../Loading/Loading";
import WentWrong from "../WentWrong/WentWrong";
import NotFound from "../NotFound/NotFound";

import AppUrl from "../../restApi/AppUrl";
import RestClient from "../../restApi/RestClient";

class AllCources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coursesData: [],
      isLoading: true,
      isEorror: false,
    };
  }

  componentDidMount() {
    RestClient.GetRequest(AppUrl.SelectAllCourse)
      .then((data) => {
        this.setState({
          coursesData: data["data"],
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
    const CourcesItem = ({ id, imgUrl, title, description }) => {
      return (
        <Col lg={6} md={12} sm={12} className="mb-5 mb-lg-0 p-sm-3 p-md-2">
          <Row>
            <Col lg={6} md={6} sm={12}>
              <img src={imgUrl} alt="cources" className="courseImg" />
            </Col>
            <Col lg={6} md={6} sm={12}>
              <h5 className="text-justify courseTitle">{title}</h5>
              <p className="text-justify courseDes">{description}</p>
              <Link className="courseDetails float-left" to={`/cources/` + id}>
                Details
              </Link>
            </Col>
          </Row>
        </Col>
      );
    };

    const myCoursesView =
      this.state.coursesData &&
      this.state.coursesData.map((data) => {
        return (
          <CourcesItem
            key={data._id}
            imgUrl={data.courseThumbnail}
            title={data.courseName}
            description={data.courseDescription}
            id={data._id}
          />
        );
      });

    if (this.state.isLoading === true) {
      return <Loading />;
    } else if (this.state.isEorror === true) {
      return <WentWrong />;
    } else if (!this.state.coursesData) {
      return <NotFound />;
    }

    return (
      <Container className="text-center mt-5">
        <Row>{myCoursesView}</Row>
      </Container>
    );
  }
}

export default AllCources;
