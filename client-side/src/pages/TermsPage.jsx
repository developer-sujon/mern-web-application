//external imports
import React, { Component } from "react";
import TermsDescription from "../components/TermsDescription/TermsDescription";

//enternel imports
import PageTop from "../components/PageTop/PageTop";
import TopNavigation from "../components/TopNavigation/TopNavigation";
import Footer from "../components/Footer/Footer";
class TermsPage extends Component {
  componentDidMount = () => {
    window.scroll(0, 0);
  };

  render() {
    return (
      <>
        <TopNavigation pageTitle="Terms Page" />
        <PageTop pageTitle="Terms Page" />
        <TermsDescription />
        <Footer />
      </>
    );
  }
}

export default TermsPage;
