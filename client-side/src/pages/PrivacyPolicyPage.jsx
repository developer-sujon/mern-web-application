//external imports
import React, { Component } from "react";
import PrivacyPolicyDescription from "../components/PrivacyPolicyDescription/PrivacyPolicyDescription";

//enternel imports
import PageTop from "../components/PageTop/PageTop";
import TopNavigation from "../components/TopNavigation/TopNavigation";
import Footer from "../components/Footer/Footer";
class PrivacyPolicyPage extends Component {
  componentDidMount = () => {
    window.scroll(0, 0);
  };

  render() {
    return (
      <>
        <TopNavigation pageTitle="Privacy Policy Page" />
        <PageTop pageTitle="Privacy Policy Page" />
        <PrivacyPolicyDescription />
        <Footer />
      </>
    );
  }
}

export default PrivacyPolicyPage;
