import React, { useEffect } from "react";
import SideBar from "../components/SideBar";
import Toast from "../components/ToastContainer";
import { toast } from "react-toastify";
const HomeScreen = ({ Islogin }) => {
  console.log(Islogin, "agdsbgfadsfh");
  useEffect(() => {
    if (Islogin) {
      toast("Login Successfully");
    }
  }, [Islogin]);
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-2 col-3 px-0">
          <SideBar
            title1={"Dashboard"}
            title2={"Users List"}
            title3={"Teams List"}
            title4={"Events List"}
            title5={"Seasons"}
            title6={"Settings"}
          />
        </div>
        <div className="flex-column">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style={{ backgroundColor: "lightgray" }}
          ></input>
        </div>
      </div>
      <Toast
        className={"Toastify"}
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      ></Toast>
    </div>
  );
};

export default HomeScreen;
