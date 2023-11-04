import React from "react";
import { FONT_SIZE } from "../utils/constants";
import TableContainer from "../components/TableContainer";
import { IMAGES } from "../utils/SharedImages";
import Header from "../components/Header";

const SeasonsScreen = () => {
  const INITIAL_STATE = [
    {
      SNo: "01",
      seasons: "Summer 2023-2024",
      update: IMAGES.pencil_Icon,
      Delete: "coding",
    },
    {
      SNo: "02",
      seasons: "Fall 2023",
      update: IMAGES.pencil_Icon,
      Delete: "reading",
    },
    {
      SNo: "03",
      seasons: "Spring 2023",
      update: IMAGES.pencil_Icon,
      Delete: require("../../app/assets/trash.png"),
    },
    {
      SNo: "04",
      seasons: "Winter 2023-2024",
      update: IMAGES.pencil_Icon,
      Delete: require("../../app/assets/trash.png"),
    },
  ];

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
            >
              Create Season
            </button>
          </div>
          <TableContainer data={INITIAL_STATE} seasonsList={true} />
        </div>
      </div>
    </div>
  );
};

export default SeasonsScreen;
