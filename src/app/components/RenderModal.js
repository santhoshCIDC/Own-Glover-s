import React from "react";
import Modal from "react-bootstrap/Modal";

export default function RenderModal({
  show,
  onHide,
  modaltitle,
  modalbody,
  CancelText,
  okOnClick,
  OkText,
  cancelOnClick,
  logoutModal = false,
  fieldsActive = false,
  closeBtnOnClick,
}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size={logoutModal ? "lg" : "sm"}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {logoutModal ? (
        <>
          <Modal.Header className="border-0" closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {modaltitle}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalbody}</Modal.Body>
          <Modal.Footer className="border-0">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={cancelOnClick}
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
          </Modal.Footer>
        </>
      ) : (
        <>
          <button
            type="button"
            class="btn-close align-self-end p-4"
            aria-label="Close"
            onClick={closeBtnOnClick}
          />
          <div className="modal-contents ">
            <Modal.Header className="border-0 p-0">
              <Modal.Title id="contained-modal-title-vcenter">
                <h6> {modaltitle} </h6>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0">{modalbody}</Modal.Body>
            <Modal.Footer className="border-0">
              <button
                type="button"
                className={
                  fieldsActive
                    ? "btn btn-primarys mb-4"
                    : "btn btn-primary-disabled mb-4"
                }
                onClick={okOnClick}
                style={{ cursor: fieldsActive ? "pointer" : "default" }}
              >
                {OkText}
              </button>
            </Modal.Footer>
          </div>
        </>
      )}
    </Modal>
  );
}
