import React from "react";
import Header from "../components/Header";

const UserListScreen = () => {
  return (
    <div className="container-fluid h-100 p-0">
      <Header />
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
