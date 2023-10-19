import React, { useState } from "react";
import baseballGround from "../assets/bg.png";
import { Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast from "../components/ToastContainer";
import { Icon } from "@iconify/react";
import Utility from "../utils/Utility";
import { COLOR, FONT_SIZE } from "../utils/constants";
import { useNavigate } from "react-router-dom";
const LoginScreen = ({ setLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onClickLoginButton = () => {
    if (email.trim().length === 0) {
      toast("Please enter email");
    } else if (!Utility.validateEmail(email.trim())) {
      toast("Please enter valid email");
    } else if (password.trim().length === 0) {
      toast("Please enter password");
    } else if (!Utility.validatePassword(password.trim())) {
      toast("Please enter valid password");
    } else {
      navigate("/home");
      setLogin(true);
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
            <div className="col-12">
              <div className="flex">
                <input
                  style={{
                    height: 40,
                    marginTop: 20,
                    borderRadius: 8,
                    borderWidth: 0.8,
                    borderColor: COLOR.BLACK_COLOR,
                    fontSize: FONT_SIZE.S,
                  }}
                  type={"email"}
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Email"
                  value={email}
                  onChange={(text) => setEmail(text.target.value)}
                />
                <div className="col-12">
                  <div style={{ position: "relative" }}>
                    <input
                      style={{
                        height: 40,
                        marginTop: 20,
                        marginBottom: 30,
                        borderRadius: 8,
                        borderWidth: 0.8,
                        borderColor: COLOR.BLACK_COLOR,
                        fontSize: FONT_SIZE.S,
                      }}
                      type={showPassword ? "text" : "password"}
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Password"
                      value={password}
                      onChange={(text) => setPassword(text.target.value)}
                    />
                    <Icon
                      icon={showPassword ? "ion:eye" : "el:eye-close"}
                      width="23"
                      height="23"
                      style={{
                        position: "absolute",
                        right: 10,
                        top: 8,
                        cursor: "pointer",
                      }}
                      onClick={togglePasswordVisibility}
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
                  }}
                  onClick={onClickLoginButton}
                >
                  Login
                </Button>
              </div>
            </div>
            <h6
              style={{
                fontSize: FONT_SIZE.S,
                textDecorationLine: "underline",
                color: COLOR.APP_COLOR,
              }}
            >
              Forgot Password?
            </h6>
          </Card>
        </Card>
        <div className="col-4"></div>
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

export default LoginScreen;
