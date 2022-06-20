import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import CourcesPage from "../pages/CourcesPage";
import HomePage from "../pages/HomePage";
import PortfolioPage from "../pages/PortfolioPage";
import ServicesPage from "../pages/ServicesPage";

import RefundPolicyPage from "../pages/RefundPolicyPage";
import TermsPage from "../pages/TermsPage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import CourseDetailsPage from "../pages/CourseDetailsPage";
import ProjectDetailsPage from "../pages/ProjectDetailsPage";
import NotFoundPage from "../pages/NotFoundPage";

class AppRoutes extends Component {
  render() {
    return (
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/cources" element={<CourcesPage />} />
          <Route path="/cources/:courcesId" element={<CourseDetailsPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route
            path="/portfolio/:portfolioId"
            element={<ProjectDetailsPage />}
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </>
    );
  }
}

export default AppRoutes;
