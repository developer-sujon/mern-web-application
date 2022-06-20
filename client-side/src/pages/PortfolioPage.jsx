//external imports
import React, { Component } from "react";

//enternel imports
import AllProjects from "../components/AllProjects/AllProjects";
import PageTop from "../components/PageTop/PageTop";
import TopNavigation from "../components/TopNavigation/TopNavigation";
import Footer from "../components/Footer/Footer";

class PortfolioPage extends Component {
  componentDidMount = () => {
    window.scroll(0, 0);
  };
  render() {
    return (
      <>
        <TopNavigation pageTitle="Portfolio" />
        <PageTop pageTitle="Portfolio" />
        <AllProjects />
        <Footer />
      </>
    );
  }
}

export default PortfolioPage;
