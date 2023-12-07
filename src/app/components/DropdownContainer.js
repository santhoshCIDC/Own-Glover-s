import React, { useState } from "react";
import { IMAGES } from "../utils/SharedImages";
import { COLOR, FONT_SIZE } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RenderModal from "./RenderModal";
import { isLogout } from "../redux/slices/AuthSlice";

const DropdownContainer = ({ editprofile, changepassword, logout }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const userDetails = useSelector((state) => state.userState.user);
  return (
    <div>
      <div className="dropdown me-md-3">
        <button
          className="btn dropdown-toggle d-flex align-items-center rounded-1 p-2 me-lg-3  "
          style={{
            backgroundColor: COLOR.LIGHT_GREY,
            border: "0",
          }}
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src={IMAGES.user_Icon}
            style={{ width: "10px", minWidth: "16px" }}
            alt="user"
          />
          <p className="mb-0 ms-2 me-1">{userDetails?.username}</p>
          <img
            className="dropdown_icon"
            src={IMAGES.downArrow_Icon}
            alt="downArrow"
          />
        </button>
        <ul class="dropdown-menu">
          <li>
            <button
              className="dropdown-item d-flex align-items-center"
              type="button"
              style={{ fontSize: FONT_SIZE.S }}
              onClick={() => navigate("/editProfile")}
            >
              <img
                src={IMAGES.user_Icon}
                style={{ width: "10px", minWidth: "16px" }}
                alt="editprofile"
              />
              <p className="mb-0 ms-2 me-2">{editprofile}</p>
            </button>
          </li>
          <li>
            <button
              className="dropdown-item border-top border-bottom d-flex align-items-center"
              type="button"
              style={{ fontSize: FONT_SIZE.S }}
              onClick={() => navigate("/changePassword")}
            >
              <img
                src={IMAGES.lock_Icon}
                style={{ width: "10px", minWidth: "16px" }}
                alt="lock"
              />
              <p className="mb-0 ms-2 me-2">{changepassword}</p>
            </button>
          </li>
          <li>
            <button
              className="dropdown-item d-flex align-items-center"
              type="button"
              style={{ fontSize: FONT_SIZE.S }}
              onClick={() => {
                setShowModal(true);
              }}
            >
              <img
                src={IMAGES.logout_Icon}
                style={{ width: "10px", minWidth: "16px" }}
                alt="logout"
              />
              <p className="mb-0 ms-2 me-2">{logout}</p>
            </button>
          </li>
        </ul>
      </div>
      <RenderModal
        show={showModal}
        onHide={() => setShowModal(false)}
        cancelOnClick={() => setShowModal(false)}
        modaltitle={"Logout"}
        modalbody={"Are you sure you want to logout?"}
        CancelText={"Cancel"}
        OkText={"Logout"}
        logoutModal={true}
        okOnClick={() => {
          dispatch(isLogout());
          navigate("/login");
        }}
      />
    </div>
  );
};

export default DropdownContainer;
