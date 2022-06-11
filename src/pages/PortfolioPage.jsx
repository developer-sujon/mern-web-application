//external imports
import React, { Component } from "react";

//enternel imports
import AllProjects from "../components/AllProjects/AllProjects";
import PageTop from "../components/PageTop/PageTop";

class PortfolioPage extends Component {
  componentDidMount = () => {
    window.scroll(0, 0);
  };
  render() {
    return (
      <>
        <PageTop pagetitle="Portfolio" />
        <AllProjects />
      </>
    );
  }
}

export default PortfolioPage;
