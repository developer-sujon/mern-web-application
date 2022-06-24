import React, { useEffect } from "react";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function Private() {
  const [login, setLogin] = useState(false);
  const [token, setToke] = useState();

  useEffect(() => {
    const store = sessionStorage.getItem("token");

    if (store) {
      setToke(store);
    } else {
      setLogin(false);
      setToke();
    }
  }, []);

  return true ? <Outlet /> : <Navigate to="login" />;
}

export default Private;
