import React, { useContext } from "react";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../context/authAction";
import { AuthContext } from "../../context/authContext";
import AppUrl from "../../Services/AppUrl";
import RestClient from "../../Services/RestClient";

function Private() {
  const { user, dispatch } = useContext(AuthContext);
  // dispatch(loginStart());

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

  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default Private;
