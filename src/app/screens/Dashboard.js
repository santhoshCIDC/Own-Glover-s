import React from "react";
import { COLOR, FONT_SIZE } from "../utils/constants";
import { Icon } from "@iconify/react";
import { IMAGES } from "../utils/SharedImages";
const Dashboard = () => {
  return (
    <div>
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
  );
};

export default Dashboard;
