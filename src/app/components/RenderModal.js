import React from 'react'
import Modal from 'react-bootstrap/Modal';

export default function RenderModal({ show, onHide, modaltitle, modalbody, CancelText, okOnClick, OkText, cancelOnClick }) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='border-0' closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {modaltitle}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {modalbody}
            </Modal.Body>
            <Modal.Footer className='border-0'>
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
        </Modal>
    );
}
