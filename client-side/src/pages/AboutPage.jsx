//external imports
import React, { Component } from "react";
import AboutDescription from "../components/AboutDescription/AboutDescription";

//enternel imports
import PageTop from "../components/PageTop/PageTop";
import TopNavigation from "../components/TopNavigation/TopNavigation";
import Footer from "../components/Footer/Footer";
class AboutPage extends Component {
  componentDidMount = () => {
    window.scroll(0, 0);
  };

  render() {
    return (
      <>
        <TopNavigation pageTitle="About Me" />
        <PageTop pageTitle="About Me" />
        <AboutDescription />
        <Footer />
      </>
    );
  }
}

export default AboutPage;
