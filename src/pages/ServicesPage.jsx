//external imports
import React, { Component } from "react";
import Contact from "../components/Contact/Contact";

//enternel imports
import PageTop from "../components/PageTop/PageTop";
import Services from "../components/Services/Services";

class ServicesPage extends Component {
  componentDidMount = () => {
    window.scroll(0, 0);
  };
  render() {
    return (
      <>
        <PageTop pagetitle="My Services" />
        <Services />
        <Contact />
      </>
    );
  }
}

export default ServicesPage;
