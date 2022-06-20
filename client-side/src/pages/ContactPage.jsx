//external imports
import React, { Component } from "react";

//enternel imports
import Contact from "../components/Contact/Contact";
import PageTop from "../components/PageTop/PageTop";
import TopNavigation from "../components/TopNavigation/TopNavigation";
import Footer from "../components/Footer/Footer";

class ContactPage extends Component {
  componentDidMount = () => {
    window.scroll(0, 0);
  };
  render() {
    return (
      <>
        <TopNavigation pageTitle="Contact" />
        <PageTop pageTitle="Contact" />
        <Contact />
        <Footer />
      </>
    );
  }
}

export default ContactPage;
