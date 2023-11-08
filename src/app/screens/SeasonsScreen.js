import React, { useState } from "react";
import { FONT_SIZE } from "../utils/constants";
import TableContainer from "../components/TableContainer";
import Header from "../components/Header";
import RenderModal from "../components/RenderModal";

const SeasonsScreen = () => {
  const INITIAL_STATE = [
    {
      sNo: "01",
      seasons: "Summer 2023-2024",
      update: "",
      delete: "",
    },
    {
      sNo: "02",
      seasons: "Fall 2023",
      update: "",
      delete: "",
    },
    {
      sNo: "03",
      seasons: "Spring 2023",
      update: "",
      delete: "",
    },
    {
      sNo: "04",
      seasons: "Winter 2023-2024",
      update: "",
      delete: "",
    },
  ];
  const [showModal, setShowModal] = useState(false);
  // Initial render
  return (
    <div className="container-fluid h-100 p-0">
      <Header />
      <div className="container-fluid border-top">
        <div className="col">
          <h5 className="m-3">Seasons</h5>
        </div>
        <div className="container-fluid border">
          <div
            className=" ms-3 me-3 d-flex justify-content-between border-bottom"
            style={{ justifyContent: "space-between", display: "flex" }}
          >
            <button
              className="btn w-10 mt-4 mb-3"
              style={{ marginRight: "1vw", border: "none", cursor: "default" }}
            >
              <h6 className=" fw-bold active-text-color text-nowrap">
                Season List
              </h6>
            </button>
            <button
              className="px-1 m-4 rounded-1"
              style={{ fontSize: FONT_SIZE.S, border: "none" }}
              onClick={() => setShowModal(true)}
            >
              Create Season
            </button>
          </div>
          <RenderModal
            show={showModal}
            onHide={() => setShowModal(false)}
            closeBtnOnClick={() => setShowModal(false)}
            modaltitle={"Season Name:"}
            modalbody={
              <div>
                <input
                  className="border border-success-subtle border-1 p-1 px-2"
                  placeholder="Season Name"
                  style={{ fontSize: FONT_SIZE.S, borderRadius: 3 }}
                />
                <h6 className="date-text pt-3">Start Date:</h6>
                <input
                  type="date"
                  className="border border-success-subtle border-1 p-1 px-2"
                  placeholder="dd/mm/yyyy"
                  style={{
                    fontSize: FONT_SIZE.S,
                    borderRadius: 3,
                    width: "100%",
                  }}
                />
                <h6 className="date-text pt-3">End Date:</h6>
                <input
                  type="date"
                  className="border border-success-subtle border-1 p-1 px-2"
                  placeholder="dd/mm/yyyy"
                  style={{
                    fontSize: FONT_SIZE.S,
                    borderRadius: 3,
                    width: "100%",
                  }}
                />
              </div>
            }
            OkText={"Submit"}
            fieldsActive={true}
            okOnClick={() => {}}
          />
          <TableContainer data={INITIAL_STATE} />
        </div>
      </div>
    </div>
  );
};

export default SeasonsScreen;
