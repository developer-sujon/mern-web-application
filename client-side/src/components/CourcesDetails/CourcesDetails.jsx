import React, { Component, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";

import RestClient from "../../restApi/RestClient";
import AppUrl from "../../restApi/AppUrl";
import Loading from "../Loading/Loading";
import WentWrong from "../WentWrong/WentWrong";
import NotFound from "../NotFound/NotFound";

const CourcesDetails = () => {
  const { courcesId } = useParams();
  const [courceInfo, setCourceInfo] = useState({
    courseName: "",
    courseDescription: "",
    courseCover: "",
    isLoading: true,
    isEorror: false,
    notFound: false,
  });

  useEffect(() => {
    RestClient.GetRequest(AppUrl.SelectAllCourse + "/" + courcesId)
      .then((data) => {
        setCourceInfo({
          ...courceInfo,
          courseName: data["data"][0].courseName,
          courseDescription: data["data"][0].courseDescription,
          courseCover: data["data"][0].courseCover,
          isLoading: false,
          isEorror: false,
          notFound: false,
        });
      })
      .catch((err) => {
        console.log(err);
        setCourceInfo({
          ...courceInfo,
          isLoading: false,
          isEorror: true,
          notFound: true,
        });
      });
  }, []);

  if (courceInfo.isLoading === true) {
    return <Loading />;
  } else if (courceInfo.notFound === true) {
    return <NotFound />;
  } else if (courceInfo.isEorror === true) {
    return <WentWrong />;
  } else {
    return (
      <Container className="mt-5">
        <Row>
          <Col lg={6} md={6} sm={12}>
            <img
              className=" mt-4 w-100"
              src={courceInfo.courseCover}
              alt="project-img"
            />
          </Col>
          <Col lg={6} md={6} sm={12}>
            <h2 className="serviceName">{courceInfo.courseName}</h2>
            <p className="serviceDescription">{courceInfo.courseDescription}</p>
            <Button target="_blank" variant="primary" href="http://sujon.one">
              More Info
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default CourcesDetails;
