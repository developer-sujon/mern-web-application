//external imports
import React, { Component } from "react";

//enternel imports
import TopNavigation from "./components/TopNavigation/TopNavigation";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./router/AppRoutes";

class App extends Component {
  render() {
    return (
      <>
        <TopNavigation />
        <AppRoutes />
        <Footer />
      </>
    );
  }
}

export default App;