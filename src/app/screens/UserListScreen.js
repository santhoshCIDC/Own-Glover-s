import React from "react";
import DropdownContainer from "../components/DropdownContainer";

const UserListScreen = () => {
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
      <div className="container-fluid py-3 border-top border-bottom">
        <div className="row">
          <div className="col">
            <h5 className="mb-0">Users</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserListScreen;
