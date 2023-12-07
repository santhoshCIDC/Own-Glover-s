import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { COLOR, FONT_SIZE } from "../../utils/constants";
import InputContainer from "../../components/InputContainer";
import { useNavigate } from "react-router-dom";
import Utility, { ToastMessage } from "../../utils/Utility";
import { useDispatch, useSelector } from "react-redux";
import CircleLoading from "../../components/CircleLoading";
import { useEditProfileMutation } from "../../redux/services/AuthService";
import { editProfileDispatch } from "../../redux/slices/AuthSlice";

const EditProfileScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editProfile, { data, isLoading, isSuccess }] =
    useEditProfileMutation();
  const userDetails = useSelector((state) => state.userState.user);
  const [firstName, setFirstName] = useState(userDetails?.first_name);
  const [lastName, setLastName] = useState(userDetails?.last_name);
  const [email, setEmail] = useState(userDetails?.email);

  useEffect(() => {
    if (data?.code === 0) {
      Utility.toastMessage("Profile updated successfully");
      dispatch(editProfileDispatch(data?.data));
    } else {
      Utility.toastMessage(data?.message);
    }
  }, [isSuccess]);

  const onClickUpdate = async () => {
    if (firstName.trim().length === 0) {
      Utility.toastMessage("Please enter firstname");
    } else if (lastName.trim().length === 0) {
      Utility.toastMessage("Please enter lastname");
    } else {
      console.log("APICAll");
      let editProfileReq = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        photo: "hi",
      };
      await editProfile(editProfileReq);
    }
  };

  return (
    <div className="container-fluid h-100 p-0">
      <Header />
      <div className="container-fluid py-3 border-top border-bottom">
        <div className="row">
          <div className="col">
            <h5 className="mb-0">Edit Profile</h5>
          </div>
        </div>
      </div>
      <div className="container-fluid px-4 py-4">
        {isLoading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ marginTop: "20%" }}
          >
            <CircleLoading />
          </div>
        ) : (
          <div className="row">
            <div
              className="col-sm-6 px-2 py-3"
              style={{ backgroundColor: COLOR.LIGHT_GREY }}
            >
              <div className="p-3">
                <p className="fw-bold mb-4">Profile Picture</p>
                <div className="row">
                  <div className="d-flex">
                    <input
                      type="file"
                      style={{ fontSize: FONT_SIZE.S }}
                    ></input>
                    <button
                      type="button"
                      className="btn border-none"
                      style={{
                        backgroundColor: COLOR.BUTTON_COLOR,
                        color: COLOR.WHITE_COLOR,
                        fontSize: FONT_SIZE.S,
                      }}
                    >
                      Upload
                    </button>
                  </div>
                </div>
                <div className="mt-5">
                  <h6 className="fw-bold">First Name</h6>
                  <InputContainer
                    type={"text"}
                    placeholder={"First Name"}
                    value={firstName}
                    onChange={(text) => setFirstName(text.target.value)}
                  />
                  <h6 className="mt-3 fw-bold">Last Name</h6>
                  <InputContainer
                    type={"text"}
                    placeholder={"Last Name"}
                    value={lastName}
                    onChange={(text) => setLastName(text.target.value)}
                  />
                  <h6 className="mt-3 fw-bold">Email</h6>
                  <InputContainer
                    type={"text"}
                    placeholder={"Email"}
                    value={email}
                    onChange={(text) => setEmail(text.target.value)}
                    disabled={true}
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
        )}
      </div>
      {ToastMessage()}
    </div>
  );
};

export default EditProfileScreen;
