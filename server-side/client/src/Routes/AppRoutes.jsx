//external Lib  imports
import React from "react";
import { Routes, Route } from "react-router-dom";
import ContactPage from "../pages/ContactPage";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import RegistrationPage from "../pages/RegistrationPage";
import ChartPage from "../pages/ChartPage";
import CoursePage from "../pages/CoursePage";
import ProjectPage from "../pages/ProjectPage";
import ServicePage from "../pages/ServicePage";
import TestimonialPage from "../pages/TestimonialPage";
import ForgetPasswordPage from "../pages/ForgetPasswordPage";
import SettingPage from "../pages/SettingPage";
import Private from "../components/Private/Private";
import NotFoundPage from "../pages/NotFoundPage";

function Approutes() {
  return (
    <Routes>
      <Route path="/*" element={<Private />}>
        <Route path="" element={<DashboardPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="chart" element={<ChartPage />} />
        <Route path="course" element={<CoursePage />} />
        <Route path="project" element={<ProjectPage />} />
        <Route path="service" element={<ServicePage />} />
        <Route path="testimonial" element={<TestimonialPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="setting" element={<SettingPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/forget-password" element={<ForgetPasswordPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Approutes;
