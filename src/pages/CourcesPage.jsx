//external imports
import React, { Component } from "react";

//enternel imports
import AllCources from "../components/AllCources/AllCources";
import PageTop from "../components/PageTop/PageTop";

class CourcesPage extends Component {
  componentDidMount = () => {
    window.scroll(0, 0);
  };
  render() {
    return (
      <>
        <PageTop pagetitle="All Courses" />
        <AllCources />
      </>
    );
  }
}

export default CourcesPage;
