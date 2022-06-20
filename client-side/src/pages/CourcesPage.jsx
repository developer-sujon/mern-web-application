//external imports
import React, { Component } from "react";

//enternel imports
import AllCources from "../components/AllCources/AllCources";
import PageTop from "../components/PageTop/PageTop";
import TopNavigation from "../components/TopNavigation/TopNavigation";
import Footer from "../components/Footer/Footer";

class CourcesPage extends Component {
  componentDidMount = () => {
    window.scroll(0, 0);
  };
  render() {
    return (
      <>
        <TopNavigation pageTitle="All Courses" />
        <PageTop pageTitle="All Courses" />
        <AllCources />
        <Footer />
      </>
    );
  }
}

export default CourcesPage;
