import React, { useState } from "react";
import Header from "../components/Header";
import { COLOR } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import Utility, { ToastMessage } from "../utils/Utility";
import InputContainer from "../components/InputContainer";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const onClickUpdate = () => {
    if (oldPassword.trim().length === 0) {
      Utility.toastMessage("Please enter old password");
    } else if (newPassword.trim().length === 0) {
      Utility.toastMessage("Please enter new password");
    } else if (!Utility.validatePassword(newPassword.trim())) {
      Utility.toastMessage("Please enter valid new password");
    } else if (confirmPassword.trim().length === 0) {
      Utility.toastMessage("Please enter Confirm password");
    } else if (!Utility.validatePassword(confirmPassword.trim())) {
      Utility.toastMessage("Please enter valid confirm password");
    } else if (newPassword.trim() !== confirmPassword.trim()) {
      Utility.toastMessage("New and Confirm passwords are not matched");
    } else {
      console.log("-=-==-=-=->ChangePassword");
    }
  };
  return (
    <div className="container-fluid h-100 p-0">
      <Header />
      <div className="container-fluid px-0 border-top">
        <div className="border-bottom">
          <h5 className="m-3">Change Password</h5>
        </div>
        <div className="container-fluid px-4 py-4">
          <div className="row">
            <div
              className="col-sm-6 px-2 py-3"
              style={{ backgroundColor: COLOR.LIGHT_GREY }}
            >
              <div className="p-3">
                <h6>Old Password</h6>
                <InputContainer
                  type={"password"}
                  placeholder={"Old Password"}
                  value={oldPassword}
                  onChange={(text) => setOldPassword(text.target.value)}
                />
                <h6 className="mt-3">New Password</h6>
                <InputContainer
                  placeholder={"New Password"}
                  value={newPassword}
                  onChange={(text) => setNewPassword(text.target.value)}
                  type={newPasswordVisible ? "text" : "password"}
                  rightIcon={newPasswordVisible ? "ion:eye" : "el:eye-close"}
                  onClickRightIcon={() =>
                    setNewPasswordVisible(!newPasswordVisible)
                  }
                />
                <h6 className="mt-3">Confirm Password</h6>
                <InputContainer
                  placeholder={"Confirm Password"}
                  value={confirmPassword}
                  onChange={(text) => setConfirmPassword(text.target.value)}
                  type={confirmPasswordVisible ? "text" : "password"}
                  rightIcon={
                    confirmPasswordVisible ? "ion:eye" : "el:eye-close"
                  }
                  onClickRightIcon={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                />
                <button
                  type="button"
                  class="btn btn-secondary btn-sm mt-3"
                  onClick={() => onClickUpdate()}
                >
                  Update
                </button>
                <button
                  type="button"
                  class="btn btn-primary btn-sm ms-2 mt-3"
                  onClick={() => navigate("/dashboard")}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {ToastMessage()}
    </div>
  );
};

export default ChangePassword;
