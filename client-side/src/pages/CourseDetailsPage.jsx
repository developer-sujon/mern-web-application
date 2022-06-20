//external imports
import React, { Component } from "react";

//enternel imports
import CourcesDetails from "../components/CourcesDetails/CourcesDetails";
import PageTop from "../components/PageTop/PageTop";
import TopNavigation from "../components/TopNavigation/TopNavigation";
import Footer from "../components/Footer/Footer";

class CourseDetailsPage extends Component {
  componentDidMount = () => {
    window.scroll(0, 0);
  };
  render() {
    return (
      <>
        <TopNavigation pageTitle="Course Details Page" />
        <PageTop pageTitle="Course Details Page" />
        <CourcesDetails />
        <Footer />
      </>
    );
  }
}

export default CourseDetailsPage;
