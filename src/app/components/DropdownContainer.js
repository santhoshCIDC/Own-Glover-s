import React from "react";
import { IMAGES } from "../utils/SharedImages";
import { COLOR, FONT_SIZE } from "../utils/constants";

const DropdownContainer = ({ editprofile, changepassword, logout }) => {
  return (
    <div>
      <div className="dropdown">
        <button
          className="btn dropdown-toggle d-flex align-items-center rounded-1 p-2  "
          style={{
            backgroundColor: COLOR.LIGHT_GREY,
            marginRight: 50,
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
          <p className="mb-0 ms-2 me-1">Admin Glovers</p>
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
    </div>
  );
};

export default DropdownContainer;
