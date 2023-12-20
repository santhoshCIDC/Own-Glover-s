import React, { useEffect, useState } from "react";
import baseballGround from "../assets/bg.png";
import { Button, Card } from "react-bootstrap";
import Utility, { ToastMessage } from "../utils/Utility";
import { COLOR, FONT_SIZE } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { loader } from "../components/Loader";
import InputContainer from "../components/InputContainer";
import { useLoginUserMutation } from "../redux/services/AuthService";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [login, { data, isLoading, isSuccess }] = useLoginUserMutation();

  useEffect(() => {
    if (data?.code === 0) {
      if (isSuccess) {
        navigate("/dashboard");
        Utility.toastMessage("Login successfully");
      } 
    } else {
      Utility.toastMessage(data?.message);
    }
  }, [isSuccess, data, navigate]);

  const onClickLoginButton = async () => {
    if (email.trim().length === 0) {
      Utility.toastMessage("Please enter email");
    } else if (!Utility.validateEmail(email.trim())) {
      Utility.toastMessage("Please enter valid email");
    } else if (password.trim().length === 0) {
      Utility.toastMessage("Please enter password");
    } else if (!Utility.validatePassword(password.trim())) {
      Utility.toastMessage("Please enter valid password");
    } else {
      let loginReq = {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      };
      await login(loginReq);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="flex-container"
      style={{
        backgroundImage: `url(${baseballGround})`,
        backgroundRepeat: "no-repeat",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: 24,
      }}
    >
      <div className="row">
        <div className="col-4"></div>
        <Card
          className="col-4 "
          style={{
            width: "100%",
            padding: 24,
          }}
        >
          <img
            alt="gloverslogo"
            style={{
              width: "60%",
              alignSelf: "center",
            }}
            src={require("../assets/gloverslogo.png")}
          />
          <Card
            style={{
              marginTop: 24,
              padding: 24,
            }}
          >
            <h3>Login</h3>
            <h6>Please enter the email and password</h6>
            <div className="col-12 mt-3">
              <div className="flex">
                <InputContainer
                  placeholder={"Email"}
                  type={"email"}
                  value={email}
                  onChange={(text) => setEmail(text.target.value)}
                />
                <div className="col-12 my-3">
                  <div style={{ position: "relative" }}>
                    <InputContainer
                      placeholder={"Password"}
                      value={password}
                      onChange={(text) => setPassword(text.target.value)}
                      type={showPassword ? "text" : "password"}
                      rightIcon={showPassword ? "ion:eye" : "el:eye-close"}
                      onClickRightIcon={togglePasswordVisibility}
                    />
                  </div>
                </div>
                <Button
                  style={{
                    width: "-webkit-fill-available",
                    height: 40,
                    marginBottom: 13,
                    borderRadius: 8,
                    backgroundColor: COLOR.BUTTON_COLOR,
                    borderColor: COLOR.BUTTON_COLOR,
                    display: "flex",
                    justifyContent: "center",
                  }}
                  onClick={onClickLoginButton}
                  disabled={isLoading ? true : false}
                >
                  {isLoading ? (
                    loader()
                  ) : (
                    <h5 style={{ fontSize: FONT_SIZE.S, display: "contents" }}>
                      Login
                    </h5>
                  )}
                </Button>
              </div>
            </div>
            <h6
              style={{
                fontSize: FONT_SIZE.S,
                textDecorationLine: "underline",
                color: COLOR.APP_COLOR,
              }}
              onClick={() => navigate("/forgotPassword")}
            >
              Forgot Password?
            </h6>
          </Card>
        </Card>
        <div className="col-4"></div>
      </div>
      {ToastMessage()}
    </div>
  );
};

export default LoginScreen;
