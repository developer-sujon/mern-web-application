//external imports
import React, { Component } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

//enternel imports
import projectOne from "../../assets/images/projects/project-1.jpg";
import projectTow from "../../assets/images/projects/project-2.jpg";
import projectThree from "../../assets/images/projects/project-3.jpg";

const ProjectItem = ({ imgUrl, title, description }) => {
  return (
    <Col sm={12} md={6} lg={4} className="mb-5 mb-lg-0">
      <Card className="projectCard">
        <Card.Img variant="top" src={imgUrl} />
        <Card.Body>
          <Card.Title className="projectCardTitle">{title}</Card.Title>
          <Card.Text className="projectCardDes">{description}</Card.Text>
          <Button variant="primary">Details</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

class RecentProjects extends Component {
  render() {
    return (
      <Container className="text-center">
        <h1 className="serviceMainTitle">Recent Projects</h1>
        <Row>
          <ProjectItem
            imgUrl={projectOne}
            title="Card Title"
            description="Some quick example text to build on the card title and make up the bulk of the card content."
          />
          <ProjectItem
            imgUrl={projectTow}
            title="Card Title"
            description="Some quick example text to build on the card title and make up the bulk of the card content."
          />
          <ProjectItem
            imgUrl={projectThree}
            title="Card Title"
            description="Some quick example text to build on the card title and make up the bulk of the card content."
          />
        </Row>
      </Container>
    );
  }
}

export default RecentProjects;
