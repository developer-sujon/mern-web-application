//external imports
import React, { Component } from "react";
import Contact from "../components/Contact/Contact";

//enternel imports
import PageTop from "../components/PageTop/PageTop";
import Services from "../components/Services/Services";
import TopNavigation from "../components/TopNavigation/TopNavigation";
import Footer from "../components/Footer/Footer";
class ServicesPage extends Component {
  componentDidMount = () => {
    window.scroll(0, 0);
  };
  render() {
    return (
      <>
        <TopNavigation pageTitle="My Services" />
        <PageTop pageTitle="My Services" />
        <Services />
        <Contact />
        <Footer />
      </>
    );
  }
}

export default ServicesPage;
