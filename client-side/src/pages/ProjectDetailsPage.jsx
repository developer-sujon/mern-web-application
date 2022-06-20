//external imports
import React, { Component } from "react";

//enternel imports
import ProjectDetails from "../components/ProjectDetails/ProjectDetails";
import PageTop from "../components/PageTop/PageTop";
import TopNavigation from "../components/TopNavigation/TopNavigation";
import Footer from "../components/Footer/Footer";

class ProjectDetailsPage extends Component {
  componentDidMount = () => {
    window.scroll(0, 0);
  };
  render() {
    return (
      <>
        <TopNavigation pageTitle="Project Details Page" />
        <PageTop pageTitle="Project Details Page" />
        <ProjectDetails />
        <Footer />
      </>
    );
  }
}

export default ProjectDetailsPage;
