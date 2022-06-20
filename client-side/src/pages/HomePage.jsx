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
import TopNavigation from "../components/TopNavigation/TopNavigation";
import Footer from "../components/Footer/Footer";
class HomePage extends Component {
  componentDidMount = () => {
    window.scroll(0, 0);
  };
  render() {
    return (
      <>
        <TopNavigation pageTitle="Home Page" />
        <TopBanner />
        <Services />
        <Analysis />
        <Summary />
        <RecentProjects />
        <Cources />
        <Video />
        <ClientReview />
        <Footer />
      </>
    );
  }
}

export default HomePage;
