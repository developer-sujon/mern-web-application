//external Lib  imports
import React, { useContext, useEffect } from "react";
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
import { AuthContext } from "../context/authContext";
import RestClient from "../Services/RestClient";
import AppUrl from "../Services/AppUrl";
import { loginFailure, loginSuccess } from "../context/authAction";

function Approutes() {
  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    RestClient.GetRequest(AppUrl.SelectProfile)
      .then((response) => {
        console.log(response);
        dispatch(loginSuccess(response.data["data"][0]));
      })
      .catch((err) => {
        dispatch(loginFailure());
      });
  }, []);

  console.log(user);

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

      <Route
        path="/login"
        element={user ? <Private /> : <ForgetPasswordPage />}
      />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/forget-password" element={<ForgetPasswordPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Approutes;
