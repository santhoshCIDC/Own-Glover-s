// SideBar.js
// import React, { useState } from "react";
// import { FONT_SIZE } from "../utils/constants";
// import { Icon } from "@iconify/react";
// import logo from "../../app/assets/logo.svg";
// const SideBar = ({ title1, title2, title3, title4, title5, title6,dashboadClick,teamListClick, usersListClick,eventsListClick,seasonsClick,settingsClick }) => {
//   const [isHoveringDashboard, setIsHoveringDashboard] = useState("");

//   return (
//     <div>
//       <div
//         className="d-flex flex-column align-items-center align-items-sm-start min-vh-100"
//         style={{
//           borderRight: "1px solid",
//           borderRightColor: "lightgrey",
//         }}
//       >
//         <a
//           href="/home"
//           className="d-flex align-items-center text-white text-decoration-none mt-4 mb-5"
//           aria-expanded="false"
//         >
//           <img
//             src={logo}
//             alt="hugenerd"
//             style={{ width: "65%", marginLeft: 20, display: "flex" }}
//           />
//         </a>
//         <span
//           className="d-none d-sm-inline"
//           style={{ color: "gray", fontSize: FONT_SIZE.XS, marginLeft: 10 }}
//         >
//           MAIN MENU
//         </span>
//         <ul
//           className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
//           id="menu"
//         >
//           <li>
//             <a
//               href="/home"
//               data-bs-toggle="collapse"
//               className="nav-link px-3 align-middle mt-3"
//               style={{ display: "flex", alignItems: "center" }}
//               onMouseOver={() => {
//                 setIsHoveringDashboard("title1");
//               }}
//               onMouseOut={() => {
//                 setIsHoveringDashboard("");
//               }}
//               onClick={dashboadClick}
//             >
//               <Icon
//                 icon="bi:speedometer2"
//                 height={"20"}
//                 width={"20"}
//                 color="black"
//               />
//               <span
//                 className={
//                   isHoveringDashboard === "title1"
//                     ? "ms-1 d-none d-sm-inline With-Hover-Container"
//                     : "ms-1 d-none d-sm-inline Without-Hover-Container"
//                 }
//               >
//                 {title1}
//               </span>
//             </a>
//           </li>
//           <li>
//             <a
//               href="/usersList"
//               className="nav-link px-3 align-middle mt-3"
//               style={{ display: "flex", alignItems: "center" }}
//               onMouseOver={() => {
//                 setIsHoveringDashboard("title2");
//               }}
//               onMouseOut={() => {
//                 setIsHoveringDashboard("");
//               }}
//               onClick={usersListClick}
//             >
//               <Icon
//                 icon="pajamas:profile"
//                 height={"20"}
//                 width={"20"}
//                 color="black"
//               />
//               <span
//                 className={
//                   isHoveringDashboard === "title2"
//                     ? "ms-1 d-none d-sm-inline With-Hover-Container"
//                     : "ms-1 d-none d-sm-inline Without-Hover-Container"
//                 }
//               >
//                 {title2}
//               </span>
//             </a>
//           </li>
//           <li>
//             <a
//               href="/teamsList"
//               data-bs-toggle="collapse"
//               className="nav-link px-3 align-middle mt-3"
//               style={{ display: "flex", alignItems: "center" }}
//               onMouseOver={() => {
//                 setIsHoveringDashboard("title3");
//               }}
//               onMouseOut={() => {
//                 setIsHoveringDashboard("");
//               }}
//               onClick={teamListClick}
//             >
//               <Icon
//                 icon="grommet-icons:group"
//                 height={"20"}
//                 width={"20"}
//                 color="black"
//               />
//               <span
//                 className={
//                   isHoveringDashboard === "title3"
//                     ? "ms-1 d-none d-sm-inline With-Hover-Container"
//                     : "ms-1 d-none d-sm-inline Without-Hover-Container"
//                 }
//               >
//                 {title3}
//               </span>
//             </a>
//           </li>
//           <li>
//             <a
//               href="/eventsList"
//               data-bs-toggle="collapse"
//               className="nav-link px-3 align-center mt-3"
//               style={{ display: "flex", alignItems: "center" }}
//               onMouseOver={() => {
//                 setIsHoveringDashboard("title4");
//               }}
//               onMouseOut={() => {
//                 setIsHoveringDashboard("");
//               }}
//               onClick={eventsListClick}
//             >
//               <Icon
//                 icon="simple-line-icons:calender"
//                 height={"20"}
//                 width={"20"}
//                 color="black"
//               />
//               <span
//                 className={
//                   isHoveringDashboard === "title4"
//                     ? "ms-1 d-none d-sm-inline With-Hover-Container"
//                     : "ms-1 d-none d-sm-inline Without-Hover-Container"
//                 }
//               >
//                 {title4}
//               </span>
//             </a>
//           </li>
//           <li>
//             <a
//               href="/Seasons"
//               className="nav-link px-3 align-center mt-3"
//               style={{ display: "flex", alignItems: "center" }}
//               onMouseOver={() => {
//                 setIsHoveringDashboard("title5");
//               }}
//               onMouseOut={() => {
//                 setIsHoveringDashboard("");
//               }}
//               onClick={seasonsClick}
//             >
//               <Icon
//                 icon="grommet-icons:group"
//                 height={"20"}
//                 width={"20"}
//                 color="black"
//               />
//               <span
//                 className={
//                   isHoveringDashboard === "title5"
//                     ? "ms-1 d-none d-sm-inline With-Hover-Container"
//                     : "ms-1 d-none d-sm-inline Without-Hover-Container"
//                 }
//               >
//                 {title5}
//               </span>
//             </a>
//           </li>
//           <li>
//             <a
//               href="/Settings"
//               className="nav-link px-3 align-middle mt-3"
//               style={{ display: "flex", alignItems: "center" }}
//               onMouseOver={() => {
//                 setIsHoveringDashboard("title6");
//               }}
//               onMouseOut={() => {
//                 setIsHoveringDashboard("");
//               }}
//               onClick={settingsClick}
//             >
//               <Icon
//                 icon="clarity:settings-line"
//                 height={"20"}
//                 width={"20"}
//                 color="black"
//               />
//               <span
//                 className={
//                   isHoveringDashboard === "title6"
//                     ? "ms-1 d-none d-sm-inline With-Hover-Container"
//                     : "ms-1 d-none d-sm-inline Without-Hover-Container"
//                 }
//               >
//                 {title6}
//               </span>
//             </a>
//           </li>
//         </ul>
//         <hr />
//       </div>
//     </div>
//   );
// };

// export default SideBar;

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../app/assets/logo.svg";
import { useState } from "react";
import { FONT_SIZE } from "../utils/constants";
import { IMAGES } from "../utils/SharedImages";

const SideBar = ({ title1, title2, title3, title4, title5, title6 }) => {
  const [isHoveringDashboard, setIsHoveringDashboard] = useState("");
  const [isClicked, setIsClicked] = useState("");
  return (
    <Navbar expand="sm">
      <Container className="d-flex flex-column p-0">
        <div className="d-flex">
          <Navbar.Brand className="mt-3 mb-4" href="#home">
            <img src={logo} alt="hugenerd" style={{ width: "75%" }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </div>
        <Navbar.Collapse className="col-sm-11" id="basic-navbar-nav">
          <Nav className="d-flex flex-column list_container">
            <span
              className="d-none d-sm-inline mb-3"
              style={{ color: "gray", fontSize: FONT_SIZE.XS }}
            >
              MAIN MENU
            </span>
            <Nav.Link
              className={
                isClicked === "title1"
                  ? "d-flex tabClicked align-items-center mb-3"
                  : "d-flex align-items-center mb-3"
              }
              href="#home"
              onMouseOver={() => {
                setIsHoveringDashboard("title1");
              }}
              onMouseOut={() => {
                setIsHoveringDashboard("");
              }}
              onClick={() => {
                setIsClicked("title1");
              }}
            >
              <img
                src={IMAGES.speedoMeter}
                style={{ width: "1.2vw" }}
                alt="speedometer"
              />
              <span
                className={
                  isHoveringDashboard === "title1"
                    ? "ms-2 With-Hover-Container"
                    : "ms-2 Without-Hover-Container"
                }
              >
                {title1}
              </span>
            </Nav.Link>
            <Nav.Link
              className={
                isClicked === "title2"
                  ? "d-flex tabClicked align-items-center mb-3"
                  : "d-flex align-items-center mb-3"
              }
              href="#link"
              onMouseOver={() => {
                setIsHoveringDashboard("title2");
              }}
              onMouseOut={() => {
                setIsHoveringDashboard("");
              }}
              onClick={() => {
                setIsClicked("title2");
              }}
            >
              <img
                src={IMAGES.user_Icon}
                style={{ width: "1.2vw" }}
                alt="user"
              />
              <span
                className={
                  isHoveringDashboard === "title2"
                    ? "ms-2 With-Hover-Container"
                    : "ms-2 Without-Hover-Container"
                }
              >
                {title2}
              </span>
            </Nav.Link>
            <Nav.Link
              className={
                isClicked === "title3"
                  ? "d-flex tabClicked align-items-center mb-3"
                  : "d-flex align-items-center mb-3"
              }
              href="#link"
              onMouseOver={() => {
                setIsHoveringDashboard("title3");
              }}
              onMouseOut={() => {
                setIsHoveringDashboard("");
              }}
              onClick={() => {
                setIsClicked("title3");
              }}
            >
              <img
                src={IMAGES.group_Icon}
                style={{ width: "1.2vw" }}
                alt="group"
              />
              <span
                className={
                  isHoveringDashboard === "title3"
                    ? "ms-2 With-Hover-Container"
                    : "ms-2 Without-Hover-Container"
                }
              >
                {title3}
              </span>
            </Nav.Link>
            <Nav.Link
              className={
                isClicked === "title4"
                  ? "d-flex tabClicked align-items-center mb-3"
                  : "d-flex align-items-center mb-3"
              }
              href="#link"
              onMouseOver={() => {
                setIsHoveringDashboard("title4");
              }}
              onMouseOut={() => {
                setIsHoveringDashboard("");
              }}
              onClick={() => {
                setIsClicked("title4");
              }}
            >
              <img
                src={IMAGES.calendar_Icon}
                style={{ width: "1.2vw" }}
                alt="calender"
              />
              <span
                className={
                  isHoveringDashboard === "title4"
                    ? "ms-2  With-Hover-Container"
                    : "ms-2 Without-Hover-Container"
                }
              >
                {title4}
              </span>
            </Nav.Link>
            <Nav.Link
              className={
                isClicked === "title5"
                  ? "d-flex tabClicked align-items-center mb-3"
                  : "d-flex align-items-center mb-3"
              }
              href="#link"
              onMouseOver={() => {
                setIsHoveringDashboard("title5");
              }}
              onMouseOut={() => {
                setIsHoveringDashboard("");
              }}
              onClick={() => {
                setIsClicked("title5");
              }}
            >
              <img
                src={IMAGES.group_Icon}
                style={{ width: "1.2vw" }}
                alt="group"
              />
              <span
                className={
                  isHoveringDashboard === "title5"
                    ? "ms-2 With-Hover-Container"
                    : "ms-2 Without-Hover-Container"
                }
              >
                {title5}
              </span>
            </Nav.Link>
            <Nav.Link
              className={
                isClicked === "title6"
                  ? "d-flex tabClicked align-items-center mb-3"
                  : "d-flex align-items-center mb-3"
              }
              href="#link"
              onMouseOver={() => {
                setIsHoveringDashboard("title6");
              }}
              onMouseOut={() => {
                setIsHoveringDashboard("");
              }}
              onClick={() => {
                setIsClicked("title6");
              }}
            >
              <img
                src={IMAGES.setting_Icon}
                style={{ width: "1.2vw" }}
                alt="setting"
              />
              <span
                className={
                  isHoveringDashboard === "title6"
                    ? "ms-2 With-Hover-Container"
                    : "ms-2 Without-Hover-Container"
                }
              >
                {title6}
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SideBar;
