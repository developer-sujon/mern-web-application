import React, { Component, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";

import RestClient from "../../restApi/RestClient";
import AppUrl from "../../restApi/AppUrl";
import Loading from "../Loading/Loading";
import WentWrong from "../WentWrong/WentWrong";

export class CourcesDetails extends Component {
  render() {
    const CourcesDetailsView = () => {
      // const navigate = useNavigate();

      const { courcesId } = useParams();
      const [courceInfo, setCourceInfo] = useState({
        courseName: "",
        courseDescription: "",
        courseCover: "",
        isLoading: true,
        isEorror: false,
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
            });
          })
          .catch((err) => {
            console.log(err);
            setCourceInfo({
              ...setCourceInfo,
              isLoading: false,
              isEorror: false,
            });
          });
      }, []);

      if (setCourceInfo.isLoading === true) {
        return <Loading />;
      } else if (setCourceInfo.isEorror === true) {
        return <WentWrong />;
      }

      return (
        <>
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
        </>
      );
    };

    return (
      <Container className="mt-5">
        <Row>
          <CourcesDetailsView />
        </Row>
      </Container>
    );
  }
}

export default CourcesDetails;
