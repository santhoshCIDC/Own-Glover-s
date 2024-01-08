import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { FONT_SIZE } from "../utils/constants";
import { Icon } from "@iconify/react";
import Chart from "react-google-charts";

const DashboardScreen = () => {
  const [isSearch, setIsSearch] = useState("");
  const eventsData = [
    ["Element", "Density", { role: "style" }],
    ["Live 0", null, "#b87333"], // RGB value
    ["Recent 5", 5, "silver"], // English color name
    ["Upcoming", null, "gold"],
  ];

  useEffect(() => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    // Sample data for the chart (you can replace this with your own data)
    const data = [50, 80, 120];

    // Array of colors for each column
    const columnColors = ["red", "green", "blue"];

    // Chart properties
    const columnWidth = 50;
    const columnSpacing = 20;
    const chartHeight = 100;

    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw columns based on data
    data.forEach((value, index) => {
      const x = index * (columnWidth + columnSpacing);
      const y = chartHeight - value;
      const columnHeight = value;

      // Set column color
      ctx.fillStyle = columnColors[index] || "gray"; // Use gray if color not provided

      // Draw the column
      ctx.fillRect(x, y, columnWidth, columnHeight);
    });
  }, []);

  return (
    <div className="container-fluid h-100 p-0">
      <Header
        searchBar={true}
        className={"search-container col-sm-3 mb-md-0 mb-3 ms-3"}
        value={isSearch}
        onChange={(text) => {
          setIsSearch(text.target.value);
        }}
        CloseBtnOnClick={() => setIsSearch("")}
      />
      <div className="container-fluid py-3 border-top border-bottom">
        <div className="row">
          <div className="col">
            <h5 className="mb-0 ms-3">Dashboard</h5>
          </div>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-between ms-4 me-5 my-3 border-bottom">
        <h6 className="mb-0 fw-bold">Events</h6>
        <div className="d-flex">
          <Icon
            icon="icon-park-outline:dot"
            color="red"
            width="20"
            height="20"
          />
          <p style={{ fontSize: FONT_SIZE.XS }}>Live:</p>
          <a className="ms-2" style={{ fontSize: FONT_SIZE.XS }} href="">
            View all
          </a>
        </div>
      </div>
      <div className="row mx-3">
        <div className="col-sm-3 col-md-6 col-lg-3">
          <div className="bg-primary text-white rounded p-3 d-flex justify-content-between card_style1 align-items-center">
            <div>
              <h1>0</h1>
              <h5 style={{ fontSize: 17.5 }}>Today</h5>
            </div>
            <Icon
              icon="material-symbols:date-range-rounded"
              color="white"
              width="40"
              height="40"
            />
          </div>
        </div>
        <div className="col-sm-3 col-md-6 col-lg-3 my-md-0 my-2">
          <div className="bg-primary text-white rounded p-3 d-flex justify-content-between card_style2 align-items-center">
            <div>
              <h1>0</h1>
              <h5 style={{ fontSize: 17.5 }}>Tomorrow</h5>
            </div>
            <Icon
              icon="material-symbols:date-range-rounded"
              color="white"
              width="40"
              height="40"
              style={{ minWidth: 25, minHeight: 25 }}
            />
          </div>
        </div>

        <div className="col-sm-3 col-md-6 col-lg-3 my-lg-0 my-2">
          <div className="bg-primary text-white rounded p-3 d-flex justify-content-between card_style3 align-items-center">
            <div>
              <h1>0</h1>
              <h5 style={{ fontSize: 17.5 }}>Completed</h5>
            </div>
            <Icon icon="charm:tick" color="white" width="40" height="40" />
          </div>
        </div>
        <div className="col-sm-3 col-md-6 col-lg-3 my-lg-0 my-2">
          <div className="bg-primary text-white rounded p-3 d-flex justify-content-between card_style4 align-items-center">
            <div>
              <h1>0</h1>
              <h5 style={{ fontSize: 17.5 }}>Scheduled</h5>
            </div>
            <Icon icon="gg:sand-clock" color="white" width="40" height="40" />
          </div>
        </div>
        <div className="col-sm-6 my-3">
          <div className="border">
            <div className="border-bottom">
              <h6
                className="p-3"
                style={{ fontWeight: "bold", marginBottom: 0 }}
              >
                Events Graph
              </h6>
            </div>
            <Chart
              chartType="ColumnChart"
              data={eventsData}
              height={"370px"}
              legendToggle
            ></Chart>
            {/* <div className="chart-wrapper">
              <canvas  height={"400px"} width={"400px"}>

              </canvas>
            </div> */}
          </div>
        </div>
        <div className="col-sm-6 my-3">
          <div className="border">
            <div className="border-bottom">
              <h6
                className="p-3"
                style={{ fontWeight: "bold", marginBottom: 0 }}
              >
                Users Graph
              </h6>
            </div>
            {/* <Chart
              chartType="ColumnChart"
              data={playersData}
              height={"370px"}
              legendToggle
            ></Chart> */}
            <canvas
              id="myCanvas"
              // width="986" // Adjust the width based on your data
                      // height="484"
              style={{ border: "1px solid #d3d3d3" }}
            >
              Your browser does not support the HTML canvas tag.
            </canvas>
            {/* <div className="chart-wrapper">
              <canvas  height={"400px"} width={"400px"}>

              </canvas>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
