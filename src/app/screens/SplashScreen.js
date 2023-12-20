import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRefreshTokenMutation } from "../redux/services/AuthService";
import { setRefreshToken } from "../redux/slices/AuthSlice";
// import { useAppSelector } from "../redux/store";

const SplashScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tokenDetails = useSelector(
    (state) => state.userState?.tokenDetails?.access_token
  );

  const token = localStorage.getItem("userToken");
  const [refreshToken, { isLoading, data }] = useRefreshTokenMutation();

  useEffect(() => {
    if (tokenDetails !== undefined && tokenDetails !== null) {
      refreshToken({ refresh_token: JSON.parse(token).refresh_token });
    }
  }, []);

  useEffect(() => {
    if (!isLoading && data?.code === 0) {
      dispatch(setRefreshToken(data?.data));
    }
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
