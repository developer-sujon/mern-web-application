//external imports
import React, { Component } from "react";
import RefundPolicyDescription from "../components/RefundPolicyDescription/RefundPolicyDescription";

//enternel imports
import PageTop from "../components/PageTop/PageTop";
import TopNavigation from "../components/TopNavigation/TopNavigation";
import Footer from "../components/Footer/Footer";
class RefundPolicyPage extends Component {
  componentDidMount = () => {
    window.scroll(0, 0);
  };

  render() {
    return (
      <>
        <TopNavigation pageTitle="Refund Policy Page" />
        <PageTop pageTitle="Refund Policy Page" />
        <RefundPolicyDescription />
        <Footer />
      </>
    );
  }
}

export default RefundPolicyPage;
