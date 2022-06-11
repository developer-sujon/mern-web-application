//external imports
import React, { Component } from "react";

//enternel imports
import Contact from "../components/Contact/Contact";
import PageTop from "../components/PageTop/PageTop";

class ContactPage extends Component {
  componentDidMount = () => {
    window.scroll(0, 0);
  };
  render() {
    return (
      <>
        <PageTop pagetitle="Contact" />
        <Contact />
      </>
    );
  }
}

export default ContactPage;
