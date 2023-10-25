import React, { useEffect } from "react";
import SideBar from "../components/SideBar";
import Toast from "../components/ToastContainer";
import { toast } from "react-toastify";
import { COLOR, FONT_SIZE } from "../utils/constants";
import { Icon } from "@iconify/react";
import { IMAGES } from "../utils/SharedImages";

const DashboardScreen = ({ Islogin }) => {
  useEffect(() => {
    if (Islogin) {
      toast("Login Successfully");
    }
  }, [Islogin]);
  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
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
        <div className="col-sm-10 p-0">
          <div className="container-fluid py-3">
            <div className="m-0 d-flex flex-column flex-sm-row justify-content-between align-items-center">
              <div className="search-container col-sm-3">
                <Icon icon="carbon:search" width={20} height={20} />
                <input
                  class="form-control border-0 rounded-pill pl-5"
                  type="text"
                  placeholder="Search..."
                  aria-label="Search"
                  style={{
                    backgroundColor: COLOR.LIGHT_GREY,
                    fontSize: FONT_SIZE.S,
                  }}
                />
                <Icon icon="carbon:close" width={23} height={23} />
              </div>
              <div
                className="d-flex align-items-center rounded-1 p-2"
                style={{ backgroundColor: COLOR.LIGHT_GREY, marginRight: 50 }}
              >
                <img
                  src={IMAGES.user_Icon}
                  style={{ width: "10px", minWidth: "16px" }}
                  alt="user"
                />
                <p className="mb-0 ms-2 me-2">Admin Glovers</p>
                <img
                  src={IMAGES.downArrow_Icon}
                  style={{ width: "12px", minWidth: "10px" }}
                  alt="downArrow"
                ></img>
              </div>
            </div>
          </div>
          <div className="container-fluid py-3 border-top border-bottom">
            <div className="row">
              <div className="col">
                <h5 className="mb-0">Dashboard</h5>
              </div>
            </div>
          </div>
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

export default DashboardScreen;
