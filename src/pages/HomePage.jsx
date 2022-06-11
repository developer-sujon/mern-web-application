//external imports
import React, { Component } from "react";

//enternel imports
import Analysis from "../components/Analysis/Analysis";
import ClientReview from "../components/ClientReview/ClientReview";
import Cources from "../components/Cources/Cources";
import RecentProjects from "../components/RecentProjects/RecentProjects";
import Services from "../components/Services/Services";
import Summary from "../components/Summary/Summary";
import TopBanner from "../components/TopBanner/TopBanner";
import Video from "../components/Video/Video";

class HomePage extends Component {
  componentDidMount = () => {
    window.scroll(0, 0);
  };
  render() {
    return (
      <>
        <TopBanner />
        <Services />
        <Analysis />
        <Summary />
        <RecentProjects />
        <Cources />
        <Video />
        <ClientReview />
      </>
    );
  }
}

export default HomePage;
