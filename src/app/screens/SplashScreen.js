import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useAppSelector } from "../redux/store";

const SplashScreen = () => {
  const navigate = useNavigate();

  const tokenDetails = useSelector(
    (state) => state.userState?.user?.token_details?.access_token
  );
  useEffect(() => {
    setTimeout(() => {
      if (tokenDetails) {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    }, 2000);
  });

  return (
    <div
      className="flex-container"
      style={{
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <div className="SplashContainer">
        <img
          className="GloversLogo"
          alt="gloverslogo"
          src={require("../assets/gloverslogo.png")}
        />
        <img
          className="SplashLogo"
          alt="baseball"
          src={require("../assets/baseball.gif")}
        />
      </div>
    </div>
  );
};

export default SplashScreen;
