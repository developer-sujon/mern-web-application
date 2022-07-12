import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";

import RestClient from "../../restApi/RestClient";
import AppUrl from "../../restApi/AppUrl";
import Loading from "../Loading/Loading";
import WentWrong from "../WentWrong/WentWrong";
import NotFound from "../NotFound/NotFound";

const ProjectDetails = () => {
  const { portfolioId } = useParams();
  const [projectInfo, setProjectInfo] = useState({
    portfolioName: "",
    portfolioDescription: "",
    portfolioCover: "",
    isLoading: true,
    isEorror: false,
    notFound: false,
  });

  useEffect(() => {
    RestClient.GetRequest(AppUrl.SelectAllPortfolio + "/" + portfolioId)
      .then((data) => {
        setProjectInfo({
          ...projectInfo,
          portfolioName: data["data"][0].portfolioName,
          portfolioDescription: data["data"][0].portfolioDescription,
          portfolioCover: data["data"][0].portfolioCover,
          isLoading: false,
          isEorror: false,
          notFound: false,
        });
      })
      .catch((err) => {
        console.log(err);
        setProjectInfo({
          ...projectInfo,
          isLoading: false,
          isEorror: true,
          notFound: false,
        });
      });
  }, []);

  if (projectInfo.isLoading === true) {
    return <Loading />;
  } else if (projectInfo.notFound === true) {
    return <NotFound />;
  } else if (projectInfo.isEorror === true) {
    return <WentWrong />;
  } else {
    return (
      <Container className="mt-5">
        <Row>
          <Col lg={6} md={6} sm={12}>
            <img
              className=" mt-4 w-100"
              src={projectInfo.portfolioCover}
              alt="projectdetails"
            />
          </Col>
          <Col lg={6} md={6} sm={12}>
            <h2 className="serviceName">{projectInfo.portfolioName}</h2>
            <p className="serviceDescription">
              {projectInfo.portfolioDescription}
            </p>
            <Button target="_blank" variant="primary" href="http://sujon.one">
              More Info
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default ProjectDetails;
