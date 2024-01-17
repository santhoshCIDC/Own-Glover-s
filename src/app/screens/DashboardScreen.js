import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { FONT_SIZE } from "../utils/constants";
import { Icon } from "@iconify/react";
import ReactApexChart from "react-apexcharts";
import {
  useLazyGetEventMatricsQuery,
  useLazyGetEventsTabQuery,
  useLazyGetTeamMatricsQuery,
  useLazyGetUserMatricsQuery,
} from "../redux/services/DashboardService";
import { useDispatch, useSelector } from "react-redux";
import {
  getDashboardEventMatricsDispatch,
  getDashboardEventsTabDispatch,
  getDashboardTeamMatricsDispatch,
  getDashboardUserMatricsDispatch,
} from "../redux/slices/DashboardSlice";
import CircleLoading from "../components/CircleLoading";

const DashboardScreen = () => {
  const emptyChartData = {
    series: [
      {
        data: [],
      },
    ],
    options: {},
    dataLabels: {},
    legend: {},
  };
  const EventsTab = [
    { id: 1, title: "All", type: "all" },
    { id: 2, title: "Invited", type: "invited" },
    { id: 3, title: "Signed Up", type: "signedup" },
  ];
  const eventsTabColors = ["#1E9F4D", "#E2922F", "#E573A4"];
  const userMatricsColors = ["#f87979", "#8843EC", "#B250FF", "#38A6DA"];
  const dispatch = useDispatch();
  const [isSearch, setIsSearch] = useState("");
  const [eventsTabChartData, setEventsTabChartData] = useState(emptyChartData);
  const [userGraphChartData, setUserGraphChartData] = useState(emptyChartData);
  const [eventsTotalCount, setEventsTotalCount] = useState(0);
  const [eventsType, setEventsType] = useState("all");
  const eventsTabList = useSelector(
    (state) => state.dashboardEventsTabState.dashboardEventsTab
  );
  const userMatrics = useSelector(
    (state) => state.dashboardUserMatricsState.dashboardUserMatrics
  );
  const eventMatrics = useSelector(
    (state) => state.dashboardEventMatricsState.dashboardEventMatrics
  );
  const teamMatrics = useSelector(
    (state) => state.dashboardTeamMatricsState.dashboardTeamMatrics
  );

  let liveEventLength = eventsTabList?.live?.length;
  let recentEventsLength = eventsTabList?.recent?.length;
  let upcomingEventsLength = eventsTabList?.upcoming?.length;
  let staffCount = userMatrics ? userMatrics[0]?.count : null;
  let coachCount = userMatrics ? userMatrics[1]?.count : null;
  let playersCount = userMatrics ? userMatrics[3]?.count : null;
  let fanCount = userMatrics ? userMatrics[2]?.count : null;
  let todayEventCount = eventMatrics ? eventMatrics[0]?.count : null;
  let tomorrowEventCount = eventMatrics ? eventMatrics[1]?.count : null;

  const [getDashboardEventsTab, { data, isLoading }] =
    useLazyGetEventsTabQuery();
  const [
    getDashboardUserMatrics,
    { data: isUserMatricsData, isLoading: isUserMatricsLoading },
  ] = useLazyGetUserMatricsQuery();
  const [
    getDashboardEventMatrics,
    { data: isEventMatricsData, isLoading: isEventMatricsLoading },
  ] = useLazyGetEventMatricsQuery();
  const [
    getDashboardTeamMatrics,
    { data: isTeamMatricsData, isLoading: isTeamMatricsLoading },
  ] = useLazyGetTeamMatricsQuery();

  useEffect(() => {
    async function fetchData() {
      await getDashboardEventsTab({});
      await getDashboardUserMatrics({});
      await getDashboardEventMatrics({});
      await getDashboardTeamMatrics({});
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading && data?.code === 0) {
      dispatch(getDashboardEventsTabDispatch(data?.data));
    }
    if (!isUserMatricsLoading && isUserMatricsData?.code === 0) {
      dispatch(getDashboardUserMatricsDispatch(isUserMatricsData?.data));
    }
    if (!isEventMatricsLoading && isEventMatricsData?.code === 0) {
      dispatch(getDashboardEventMatricsDispatch(isEventMatricsData?.data));
    }
    if (!isTeamMatricsLoading && isTeamMatricsData?.code === 0) {
      dispatch(getDashboardTeamMatricsDispatch(isTeamMatricsData?.data));
    }
  }, [
    isUserMatricsData?.code,
    data?.code,
    isEventMatricsData?.code,
    isTeamMatricsData?.code,
  ]);

  useEffect(() => {
    if (!isLoading && data?.code === 0) {
      setEventsTotalCount(
        liveEventLength + recentEventsLength + upcomingEventsLength
      );
      setEventsTabChartData({
        series: [
          {
            data: [liveEventLength, recentEventsLength, upcomingEventsLength],
          },
        ],
        options: {
          chart: {
            height: 350,
            type: "bar",
            events: {
              click: function (chart, w, e) {
                // console.log(chart, w, e)
              },
            },
          },
          colors: eventsTabColors,
          plotOptions: {
            bar: {
              columnWidth: "45%",
              distributed: true,
            },
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            show: false,
          },
          xaxis: {
            categories: [
              `Live ${liveEventLength}`,
              `Recent ${recentEventsLength}`,
              `Upcoming ${upcomingEventsLength}`,
            ],
            labels: {
              style: {
                colors: eventsTabColors,
                fontSize: "12px",
              },
            },
          },
        },
      });
      setUserGraphChartData({
        series: [
          {
            data: [staffCount, coachCount, playersCount, fanCount],
          },
        ],
        options: {
          chart: {
            height: 350,
            type: "bar",
            events: {
              click: function (chart, w, e) {
                // console.log(chart, w, e)
              },
            },
          },
          colors: userMatricsColors,
          plotOptions: {
            bar: {
              columnWidth: "45%",
              distributed: true,
            },
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            show: false,
          },
          xaxis: {
            categories: [
              `Staff ${staffCount}`,
              `Coach ${coachCount}`,
              `Player ${playersCount}`,
              `Fan ${fanCount}`,
            ],
            labels: {
              style: {
                colors: userMatricsColors,
                fontSize: "12px",
              },
            },
          },
        },
      });
    }
  }, [
    getDashboardEventsTab,
    getDashboardUserMatrics,
    isEventMatricsLoading,
    isUserMatricsLoading,
  ]);

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
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ position: "absolute", left: "50%", top: "50%" }}
        >
          <CircleLoading />
        </div>
      ) : (
        <div className="row mx-3">
          <div className="col-sm-3 col-md-6 col-lg-3">
            <div className="bg-primary text-white rounded p-3 d-flex justify-content-between card_style1 align-items-center">
              <div>
                <h1>{todayEventCount ? todayEventCount : 0}</h1>
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
                <h1>{tomorrowEventCount ? tomorrowEventCount : 0}</h1>
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
                <h1>
                  {((recentEventsLength * 100) / eventsTotalCount).toFixed(0)}%
                </h1>
                <h5 style={{ fontSize: 17.5 }}>Completed</h5>
              </div>
              <Icon icon="charm:tick" color="white" width="40" height="40" />
            </div>
          </div>
          <div className="col-sm-3 col-md-6 col-lg-3 my-lg-0 my-2">
            <div className="bg-primary text-white rounded p-3 d-flex justify-content-between card_style4 align-items-center">
              <div>
                <h1>
                  {(
                    ((liveEventLength + upcomingEventsLength) * 100) /
                    eventsTotalCount
                  ).toFixed(0)}
                  %
                </h1>
                <h5 style={{ fontSize: 17.5 }}>Scheduled</h5>
              </div>
              <Icon icon="gg:sand-clock" color="white" width="40" height="40" />
            </div>
          </div>
          <div className="col-sm-6 my-3">
            <div className="border rounded-1">
              <div className="border-bottom">
                <h6
                  className="p-3"
                  style={{ fontWeight: "bold", marginBottom: 0 }}
                >
                  Events Graph
                </h6>
              </div>
              <div id="chart">
                <ReactApexChart
                  options={eventsTabChartData?.options}
                  series={eventsTabChartData?.series}
                  type="bar"
                  height={350}
                />
              </div>
            </div>
            <div className="border mt-4 rounded-1">
              <div className="border-bottom">
                <div className="d-flex justify-content-between">
                  <h6
                    className="p-3"
                    style={{ fontWeight: "bold", marginBottom: 0 }}
                  >
                    Team Matrics
                  </h6>
                  <div className="d-flex">
                    <h6
                      className="pt-3 pb-3 pe-2"
                      style={{ fontWeight: "bold", marginBottom: 0 }}
                    >
                      Total Team:
                    </h6>
                    <h6
                      className="pt-3 pb-3 pe-3"
                      style={{ fontWeight: "bold", marginBottom: 0 }}
                    >
                      {teamMatrics?.Elementary +
                        teamMatrics?.["Middle schools"] +
                        teamMatrics?.["High schools"] +
                        teamMatrics?.Schools +
                        teamMatrics?.["Local Leagues"] +
                        teamMatrics?.Travel}
                    </h6>
                  </div>
                </div>
              </div>
              <div class="table-responsive p-4">
                <table className={"table"}>
                  <tr>
                    <th
                      className={"bg-light border-top border-bottom py-2 ps-2"}
                      style={{
                        fontSize: FONT_SIZE.S,
                      }}
                    >
                      Type
                    </th>
                    <th
                      className={"bg-light border-top border-bottom py-2 ps-2"}
                      style={{
                        fontSize: FONT_SIZE.S,
                      }}
                    >
                      No. of teams
                    </th>
                  </tr>
                  <tbody>
                    <tr
                      style={{
                        fontSize: FONT_SIZE.S,
                      }}
                    >
                      <td>{"Local League"}</td>
                      <td>{teamMatrics?.["Local Leagues"]}</td>
                    </tr>
                    <tr
                      style={{
                        fontSize: FONT_SIZE.S,
                      }}
                    >
                      <td>{"Travel"}</td>
                      <td>{teamMatrics?.Travel}</td>
                    </tr>
                    <tr
                      style={{
                        fontSize: FONT_SIZE.S,
                      }}
                    >
                      <td>{"Schools"}</td>
                      <td>
                        {teamMatrics?.Elementary +
                          teamMatrics?.["Middle schools"] +
                          teamMatrics?.["High schools"] +
                          teamMatrics?.Schools}
                      </td>
                    </tr>
                    <tr
                      style={{
                        fontSize: FONT_SIZE.S,
                      }}
                    >
                      <td className="ps-5">{"- Elementary"}</td>
                      <td>{teamMatrics?.Elementary}</td>
                    </tr>
                    <tr
                      style={{
                        fontSize: FONT_SIZE.S,
                      }}
                    >
                      <td className="ps-5">{"- Middle Schools"}</td>
                      <td>{teamMatrics?.["Middle schools"]}</td>
                    </tr>
                    <tr
                      style={{
                        fontSize: FONT_SIZE.S,
                      }}
                    >
                      <td className="ps-5">{"- High School"}</td>
                      <td>{teamMatrics?.["High schools"]}</td>
                    </tr>
                    <tr
                      style={{
                        fontSize: FONT_SIZE.S,
                      }}
                    >
                      <td className="ps-5">{"- College"}</td>
                      <td>{teamMatrics?.Schools}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-sm-6 my-3">
            <div className="border rounded-1">
              <div className="border-bottom">
                <h6
                  className="p-3"
                  style={{ fontWeight: "bold", marginBottom: 0 }}
                >
                  Users Graph
                </h6>
              </div>
              <div id="chart">
                <ReactApexChart
                  options={userGraphChartData.options}
                  series={userGraphChartData.series}
                  type="bar"
                  height={350}
                />
              </div>
            </div>
            <div className="border mt-4 rounded-1">
              <div className="border-bottom">
                <div className="d-flex justify-content-between">
                  <h6
                    className="p-3"
                    style={{ fontWeight: "bold", marginBottom: 0 }}
                  >
                    User Matrics
                  </h6>
                  <div className="d-flex align-items-center pe-2">
                    {EventsTab.map((item, index) => (
                      <button
                        key={item.id}
                        className={`btn ${
                          eventsType === item.type ? "active-tab" : ""
                        }`}
                        style={{
                          border: "none",
                          cursor:
                            eventsType === item.type ? "default" : "pointer",
                        }}
                        onClick={() => setEventsType(item.type)}
                      >
                        <h6
                          className={`text-nowrap mb-0 ${
                            eventsType === item.type
                              ? "active-text-tab"
                              : "deActive-text-tab"
                          }`}
                        >
                          {item.title}
                        </h6>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between m-3 px-3 py-2 bg-light">
                <span style={{ fontSize: FONT_SIZE.S }}>Staffs</span>
                <span style={{ fontSize: FONT_SIZE.S }}>{staffCount}</span>
              </div>
              <div className="d-flex justify-content-between m-3 px-3 py-2 bg-light">
                <span style={{ fontSize: FONT_SIZE.S }}>Coaches</span>
                <span style={{ fontSize: FONT_SIZE.S }}>{coachCount}</span>
              </div>
              <div className="d-flex justify-content-between m-3 px-3 py-2 bg-light">
                <span style={{ fontSize: FONT_SIZE.S }}>Players</span>
                <span style={{ fontSize: FONT_SIZE.S }}>{playersCount}</span>
              </div>
              <div className="d-flex justify-content-between m-3 px-3 py-2 bg-light">
                <span style={{ fontSize: FONT_SIZE.S }}>Fans</span>
                <span style={{ fontSize: FONT_SIZE.S }}>{fanCount}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardScreen;
