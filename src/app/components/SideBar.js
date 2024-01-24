import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../app/assets/logo.svg";
import { useState } from "react";
import { FONT_SIZE } from "../utils/constants";
import { IMAGES } from "../utils/SharedImages";
import { useNavigate } from "react-router-dom";

const SideBar = ({ title1, title2, title3, title4, title5, title6 }) => {
  const navigate = useNavigate();
  const [isHoveringDashboard, setIsHoveringDashboard] = useState("");
  const [isClicked, setIsClicked] = useState("");

  return (
    <div className="d-flex" style={{ height: "100vh", paddingLeft: "5%" }}>
      <Navbar expand="sm" className="align-items-start">
        <Container className="d-flex flex-column p-0">
          <div className="d-flex">
            <Navbar.Brand className="mt-3 mb-4" href="/dashboard">
              <img src={logo} alt="hugenerd" style={{ width: "75%" }} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </div>
          <Navbar.Collapse className="col-sm-11 d-flex " id="basic-navbar-nav">
            <Nav className="d-flex flex-column list_container">
              <span
                className="d-none d-sm-inline mb-3"
                style={{ color: "gray", fontSize: FONT_SIZE.XS }}
              >
                MAIN MENU
              </span>
              <Nav.Link
                className={
                  isClicked === "title1" ||
                  window.location.pathname === "/dashboard"
                    ? "d-flex tabClicked align-items-center mb-3"
                    : "d-flex align-items-center mb-3"
                }
                onMouseOver={() => {
                  setIsHoveringDashboard("title1");
                }}
                onMouseOut={() => {
                  setIsHoveringDashboard("");
                }}
                onClick={() => {
                  setIsClicked("title1");
                  navigate("/dashboard");
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
                  isClicked === "title2" ||
                  window.location.pathname === "/userList"
                    ? "d-flex tabClicked align-items-center mb-3"
                    : "d-flex align-items-center mb-3"
                }
                onMouseOver={() => {
                  setIsHoveringDashboard("title2");
                }}
                onMouseOut={() => {
                  setIsHoveringDashboard("");
                }}
                onClick={() => {
                  setIsClicked("title2");
                  navigate("/userList");
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
                  isClicked === "title3" ||
                  window.location.pathname === "/teamsList"
                    ? "d-flex tabClicked align-items-center mb-3"
                    : "d-flex align-items-center mb-3"
                }
                onMouseOver={() => {
                  setIsHoveringDashboard("title3");
                }}
                onMouseOut={() => {
                  setIsHoveringDashboard("");
                }}
                onClick={() => {
                  setIsClicked("title3");
                  navigate("/teamsList");
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
                  isClicked === "title4" ||
                  window.location.pathname === "/eventsList"
                    ? "d-flex tabClicked align-items-center mb-3"
                    : "d-flex align-items-center mb-3"
                }
                onMouseOver={() => {
                  setIsHoveringDashboard("title4");
                }}
                onMouseOut={() => {
                  setIsHoveringDashboard("");
                }}
                onClick={() => {
                  setIsClicked("title4");
                  navigate("/eventsList");
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
                  isClicked === "title5" ||
                  window.location.pathname === "/seasons"
                    ? "d-flex tabClicked align-items-center mb-3"
                    : "d-flex align-items-center mb-3"
                }
                onMouseOver={() => {
                  setIsHoveringDashboard("title5");
                }}
                onMouseOut={() => {
                  setIsHoveringDashboard("");
                }}
                onClick={() => {
                  setIsClicked("title5");
                  navigate("/seasons");
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
                  isClicked === "title6" ||
                  window.location.pathname === "/settings"
                    ? "d-flex tabClicked align-items-center mb-3"
                    : "d-flex align-items-center mb-3"
                }
                onMouseOver={() => {
                  setIsHoveringDashboard("title6");
                }}
                onMouseOut={() => {
                  setIsHoveringDashboard("");
                }}
                onClick={() => {
                  setIsClicked("title6");
                  navigate("/settings");
                }}
              >
                <img
                  src={IMAGES.setting_Icon}
                  style={{ width: "1.2vw" }}
                  alt="settings"
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
    </div>
  );
};

export default SideBar;
