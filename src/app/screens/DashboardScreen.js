import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import Toast from "../components/ToastContainer";
import { COLOR, FONT_SIZE } from "../utils/constants";
import DropdownContainer from "../components/DropdownContainer";

const DashboardScreen = ({ Islogin }) => {
  const [isSearch, setIsSearch] = useState("");
  useEffect(() => {
    if (Islogin) {
      toast("Login Successfully");
    }
  }, [Islogin]);
  return (
    <div className="container-fluid h-100 p-0">
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
              value={isSearch}
              onChange={(text) => {
                setIsSearch(text.target.value);
              }}
            />
            <Icon
              icon="carbon:close"
              width={23}
              height={23}
              onClick={() => setIsSearch("")}
            />
          </div>
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
            <h5 className="mb-0">Dashboard</h5>
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
