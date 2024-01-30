import React from "react";
import { Navigate } from "react-router-dom";
import SideBar from "../components/SideBar";

function ProtectedRoute({ auth, children }) {
  if (auth) {
    return (
      <div className="container-fluid h-100">
        <div className="row h-100 d-flex">
          <div className="col-sm-2 border-end p-0">
            <SideBar
              title1={"Dashboard"}
              title2={"Users List"}
              title3={"Teams List"}
              title4={"Events List"}
              title5={"Seasons"}
              title6={"Settings"}
            />
          </div>
          <div className="d-flex h-100 flex-column col-sm-10 p-0">{children}</div>
        </div>
      </div>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default ProtectedRoute;
