import React from "react";
import DropdownContainer from "../components/DropdownContainer";
import { FONT_SIZE } from "../utils/constants";

const SeasonsScreen = () => {
  return (
    <div className="container-fluid h-100 p-0">
      <div className="container-fluid py-3">
        <div className="m-0 d-flex flex-column flex-sm-row justify-content-between align-items-center">
          <div className="search-container col-sm-3"></div>
          <DropdownContainer
            editprofile={"Edit Profile"}
            changepassword={"Change Password"}
            logout={"Logout"}
          />
        </div>
      </div>
      <div className="container-fluid py-3 border-top">
        <div className="row">
          <div className="col">
            <h5 className="mb-0 ms-3">Seasons</h5>
          </div>
        </div>
      </div>
      <div
        className=" ms-3 me-3 border d-flex justify-content-between"
        style={{ justifyContent: "space-between", display: "flex" }}
      >
        <button
          className="btn w-10 mt-4 mb-3"
          style={{ marginRight: "1vw", border: "none", cursor: "default" }}
        >
          <h6 className=" fw-bold active-text-color text-nowrap">
            Season List
          </h6>
        </button>
        <button
          className="px-1 m-4 rounded-1"
          style={{ fontSize: FONT_SIZE.S, border: "none" }}
        >
          Create Season
        </button>
      </div>
    </div>
  );
};

export default SeasonsScreen;
