import React, { Component, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AppUrl from "../../restApi/AppUrl";
import RestClient from "../../restApi/RestClient";
import Loading from "../Loading/Loading";
import WentWrong from "../WentWrong/WentWrong";

export class ProjectDetails extends Component {
  render() {
    const ProjectDetailsView = () => {
      const { portfolioId } = useParams();
      const [projectInfo, setProjectInfo] = useState({
        portfolioName: "",
        portfolioDescription: "",
        portfolioCover: "",
        isLoading: true,
        isEorror: false,
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
            });
          })
          .catch((err) => {
            console.log(err);
            setProjectInfo({
              ...projectInfo,
              isLoading: false,
              isEorror: false,
            });
          });
      }, []);

      if (projectInfo.isLoading === true) {
        return <Loading />;
      } else if (projectInfo.isEorror === true) {
        return <WentWrong />;
      }

      return (
        <>
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
        </>
      );
    };

    return (
      <Container className="mt-5">
        <Row>
          <ProjectDetailsView />
        </Row>
      </Container>
    );
  }
}

export default ProjectDetails;
