import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MasterLayout from "../components/MasterLayout/MasterLayout";
import {
  errorMessage,
  successMessage,
} from "../Helper/ToastMessage/ToastMessage";
import { isEmpty } from "../Helper/Validation/Validation";
import RestClient from "../Services/RestClient";

const SettingPage = () => {
  const navigate = useNavigate();

  let previousPasswordRef,
    newPasswordRef,
    confirmNewPasswordRef = useRef();

  const updatePassword = () => {
    if (isEmpty(previousPasswordRef.value)) {
      errorMessage("Previous Password is Required");
    } else if (isEmpty(newPasswordRef.value)) {
      errorMessage("New Password is Required");
    } else if (isEmpty(confirmNewPasswordRef.value)) {
      errorMessage("Confirm Password is Required");
    } else if (newPasswordRef.value !== confirmNewPasswordRef.value) {
      errorMessage("New & Confirm Password Not Match");
    } else {
      RestClient.PutRequest(
        "user/changePassword",
        previousPasswordRef.value,
        newPasswordRef.value,
      ).then((response) => {
        if (response.status === 200) {
          successMessage("Password Change Sucessfull");
          navigate("/profile");
        }
      });
    }
  };

  return (
    <MasterLayout>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="p-2">
                  <label>Previous Password</label>
                  <input
                    key={Date.now()}
                    ref={(input) => (previousPasswordRef = input)}
                    placeholder="Previous Password"
                    className="form-control animated fadeInUp"
                    type="password"
                  />
                </div>
                <div className="p-2">
                  <label>New Password</label>
                  <input
                    key={Date.now()}
                    ref={(input) => (newPasswordRef = input)}
                    placeholder="New Password"
                    className="form-control animated fadeInUp"
                    type="password"
                  />
                </div>
                <div className="p-2">
                  <label>Confirm New Password</label>
                  <input
                    key={Date.now()}
                    ref={(input) => (confirmNewPasswordRef = input)}
                    placeholder="Confirm New Password"
                    className="form-control animated fadeInUp"
                    type="password"
                  />
                </div>
                <div className="p-2">
                  <button
                    onClick={updatePassword}
                    className="btn w-100 float-end btn-primary animated fadeInUp"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default SettingPage;
