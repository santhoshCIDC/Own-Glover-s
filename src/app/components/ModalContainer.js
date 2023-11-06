import React from "react";

const ModalContainer = ({
  modaltitle,
  modalbody,
  CancelText,
  OkText,
  okOnClick,
  alertModal,
}) => {
  console.log(alertModal, "alertModal")
  return (
    <div>
      {alertModal ? (
        console.log("------->If", alertModal),
        <div div
          className="modal fade"
          id={true}
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  {modaltitle}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">{modalbody}</div>
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  {CancelText}
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={okOnClick}
                >
                  {OkText}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : <>
        {console.log("------->Else", alertModal)}
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Season Name:
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">{modalbody}</div>
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  {CancelText}
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={okOnClick}
                >
                  {OkText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
      }
    </div >
  );
};

export default ModalContainer;
