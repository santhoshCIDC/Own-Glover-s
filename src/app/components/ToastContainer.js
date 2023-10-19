import React from "react";
import { ToastContainer } from "react-toastify";

const Toast = ({
  position,
  autoClose,
  hideProgressBar,
  closeOnClick,
  rtl,
  theme,
  newestOnTop,
  pauseOnFocusLoss,
  draggable,
  pauseOnHover,
}) => {
  return (
    <>
      <ToastContainer
        position={position}
        autoClose={autoClose}
        hideProgressBar={hideProgressBar}
        newestOnTop={newestOnTop}
        closeOnClick
        rtl={rtl}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
    </>
  );
};

export default Toast;
