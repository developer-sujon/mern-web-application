//external imports
import React, { Component } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

//enternel imports
import AppUrl from "../../restApi/AppUrl";
import RestClient from "../../restApi/RestClient";
import Loading from "../Loading/Loading";
import NotFound from "../NotFound/NotFound";
import WentWrong from "../WentWrong/WentWrong";

class RecentProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectData: [],
      isLoading: true,
      isEorror: false,
    };
  }

  componentDidMount() {
    RestClient.GetRequest(AppUrl.SelectAllPortfolio)
      .then((data) => {
        this.setState({
          projectData: data["data"],
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
    const ProjectItem = ({ id, imgUrl, title, description }) => {
      let navigate = useNavigate();

      const getSingleProject = (projectid) => {
        navigate("/portfolio/" + projectid);
      };

      return (
        <Col sm={12} md={6} lg={4} className="mb-5 mb-lg-0 p-sm-3 p-md-2">
          <Card className="projectCard">
            <Card.Img variant="top" src={imgUrl} />
            <Card.Body>
              <Card.Title className="projectCardTitle">{title}</Card.Title>
              <Card.Text className="projectCardDes">{description}</Card.Text>
              <Button
                variant="primary"
                onClick={getSingleProject.bind(this, id)}
              >
                Details
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    };

    const projectView =
      this.state.projectData &&
      this.state.projectData.map((data) => {
        return (
          <ProjectItem
            key={data._id}
            id={data._id}
            imgUrl={data.portfolioThumbnail}
            title={data.portfolioName}
            description={data.portfolioDescription}
          />
        );
      });

    if (this.state.isLoading === true) {
      return <Loading />;
    } else if (this.state.isEorror === true) {
      return <WentWrong />;
    } else if (!this.state.projectData) {
      return <NotFound />;
    }

    return (
      <Container className="text-center">
        <h1 className="serviceMainTitle">Recent Projects</h1>
        <Row>{projectView}</Row>
      </Container>
    );
  }
}

export default RecentProjects;
