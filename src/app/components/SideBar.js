// SideBar.js
import React, { useState } from "react";
import { FONT_SIZE } from "../utils/constants";
import { Icon } from "@iconify/react";

const SideBar = ({ title1, title2, title3, title4, title5, title6 }) => {
  const [isHoveringDashboard, setIsHoveringDashboard] = useState("");

  return (
    <div>
      <div
        className="d-flex flex-column align-items-center align-items-sm-start px-2 pt-2 min-vh-100"
        style={{
          borderRight: "1px solid",
          borderRightColor: "lightgrey",
        }}
      >
        <a
          href="/home"
          className="d-flex align-items-center text-white text-decoration-none mt-4 mb-5"
          aria-expanded="false"
        >
          <img
            src={require("../assets/gloverslogo.png")}
            alt="hugenerd"
            style={{ width: "65%" }}
          />
        </a>
        <span
          className="d-none d-sm-inline"
          style={{ color: "gray", fontSize: FONT_SIZE.XS }}
        >
          MAIN MENU
        </span>
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li>
            <a
              href="/home"
              data-bs-toggle="collapse"
              className="nav-link px-3 align-middle mt-3"
              style={{ display: "flex", alignItems: "center" }}
              onMouseOver={() => {
                setIsHoveringDashboard("title1");
              }}
              onMouseOut={() => {
                setIsHoveringDashboard("");
              }}
            >
              <Icon
                icon="bi:speedometer2"
                height={"20"}
                width={"20"}
                color="black"
              />
              <span
                className={
                  isHoveringDashboard === "title1"
                    ? "ms-1 d-none d-sm-inline With-Hover-Container"
                    : "ms-1 d-none d-sm-inline Without-Hover-Container"
                }
              >
                {title1}
              </span>
            </a>
          </li>
          <li>
            <a
              href="/usersList"
              className="nav-link px-3 align-middle mt-3"
              style={{ display: "flex", alignItems: "center" }}
              onMouseOver={() => {
                setIsHoveringDashboard("title2");
              }}
              onMouseOut={() => {
                setIsHoveringDashboard("");
              }}
            >
              <Icon
                icon="pajamas:profile"
                height={"20"}
                width={"20"}
                color="black"
              />
              <span
                className={
                  isHoveringDashboard === "title2"
                    ? "ms-1 d-none d-sm-inline With-Hover-Container"
                    : "ms-1 d-none d-sm-inline Without-Hover-Container"
                }
              >
                {title2}
              </span>
            </a>
          </li>
          <li>
            <a
              href="/teamsList"
              data-bs-toggle="collapse"
              className="nav-link px-3 align-middle mt-3"
              style={{ display: "flex", alignItems: "center" }}
              onMouseOver={() => {
                setIsHoveringDashboard("title3");
              }}
              onMouseOut={() => {
                setIsHoveringDashboard("");
              }}
            >
              <Icon
                icon="grommet-icons:group"
                height={"20"}
                width={"20"}
                color="black"
              />
              <span
                className={
                  isHoveringDashboard === "title3"
                    ? "ms-1 d-none d-sm-inline With-Hover-Container"
                    : "ms-1 d-none d-sm-inline Without-Hover-Container"
                }
              >
                {title3}
              </span>
            </a>
          </li>
          <li>
            <a
              href="/eventsList"
              data-bs-toggle="collapse"
              className="nav-link px-3 align-center mt-3"
              style={{ display: "flex", alignItems: "center" }}
              onMouseOver={() => {
                setIsHoveringDashboard("title4");
              }}
              onMouseOut={() => {
                setIsHoveringDashboard("");
              }}
            >
              <Icon
                icon="simple-line-icons:calender"
                height={"20"}
                width={"20"}
                color="black"
              />
              <span
                className={
                  isHoveringDashboard === "title4"
                    ? "ms-1 d-none d-sm-inline With-Hover-Container"
                    : "ms-1 d-none d-sm-inline Without-Hover-Container"
                }
              >
                {title4}
              </span>
            </a>
          </li>
          <li>
            <a
              href="/Seasons"
              className="nav-link px-3 align-center mt-3"
              style={{ display: "flex", alignItems: "center" }}
              onMouseOver={() => {
                setIsHoveringDashboard("title5");
              }}
              onMouseOut={() => {
                setIsHoveringDashboard("");
              }}
            >
              <Icon
                icon="grommet-icons:group"
                height={"20"}
                width={"20"}
                color="black"
              />
              <span
                className={
                  isHoveringDashboard === "title5"
                    ? "ms-1 d-none d-sm-inline With-Hover-Container"
                    : "ms-1 d-none d-sm-inline Without-Hover-Container"
                }
              >
                {title5}
              </span>
            </a>
          </li>
          <li>
            <a
              href="/Settings"
              className="nav-link px-3 align-middle mt-3"
              style={{ display: "flex", alignItems: "center" }}
              onMouseOver={() => {
                setIsHoveringDashboard("title6");
              }}
              onMouseOut={() => {
                setIsHoveringDashboard("");
              }}
            >
              <Icon
                icon="clarity:settings-line"
                height={"20"}
                width={"20"}
                color="black"
              />
              <span
                className={
                  isHoveringDashboard === "title6"
                    ? "ms-1 d-none d-sm-inline With-Hover-Container"
                    : "ms-1 d-none d-sm-inline Without-Hover-Container"
                }
              >
                {title6}
              </span>
            </a>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  );
};

export default SideBar;
