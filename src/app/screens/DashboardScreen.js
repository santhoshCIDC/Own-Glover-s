import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { FONT_SIZE } from "../utils/constants";
import { Icon } from "@iconify/react";
import ReactApexChart from "react-apexcharts";
import {
  useLazyGetEventMatricsQuery,
  useLazyGetEventsTabQuery,
  useLazyGetRoleMatricsQuery,
  useLazyGetTeamMatricsQuery,
  useLazyGetUserMatricsQuery,
  useLazyGetUserMatricsWithParamsQuery,
} from "../redux/services/DashboardService";
import { useDispatch, useSelector } from "react-redux";
import {
  getDashboardEventMatricsDispatch,
  getDashboardEventsTabDispatch,
  getDashboardRoleMatricsDispatch,
  getDashboardTeamMatricsDispatch,
  getDashboardUserMatricsDispatch,
  getDashboardUserMatricsWithParamsDispatch,
} from "../redux/slices/DashboardSlice";
import CircleLoading from "../components/CircleLoading";

const DashboardScreen = () => {
  const EventsTab = [
    { id: 1, title: "All", type: "all" },
    { id: 2, title: "Invited", type: "invited" },
    { id: 3, title: "Signed Up", type: "signedup" },
  ];
  const initialStateOfEventLegnth = {
    liveEventLength: 0,
    recentEventsLength: 0,
    upcomingEventsLength: 0,
    todayEventCount: 0,
    tomorrowEventCount: 0,
  };
  const initialStateOfUserMatricsCount = {
    staffCount: 0,
    coachCount: 0,
    playersCount: 0,
    fanCount: 0,
    inivitedStaffCount: 0,
    inivitedCoachCount: 0,
    inivitedPlayersCount: 0,
    inivitedFanCount: 0,
  };
  const initialStateOfRoleMatricsCount = {
    videoStreamCount: 0,
    scorerCount: 0,
    pcKeeperCount: 0,
    keeperCount: 0,
  };
  //Local state
  const eventsTabColors = ["#1E9F4D", "#E2922F", "#E573A4"];
  const userMatricsColors = ["#f87979", "#8843EC", "#B250FF", "#38A6DA"];
  const dispatch = useDispatch();
  const [isSearch, setIsSearch] = useState("");
  const [eventsTotalCount, setEventsTotalCount] = useState(0);
  const [eventLength, setEventLength] = useState(initialStateOfEventLegnth);
  const [userMatricsCount, setUserMatricsCount] = useState(
    initialStateOfUserMatricsCount
  );
  const [roleMatricsCount, setRoleMatricsCount] = useState(
    initialStateOfRoleMatricsCount
  );
  const [completedCount, setCompletedCount] = useState(0);
  const [scheduledCount, setScheduledCount] = useState(0);
  const [eventsType, setEventsType] = useState("all");

  useEffect(() => {}, []);
  //API call
  const [getDashboardEventsTab, { data, isLoading }] =
    useLazyGetEventsTabQuery();
  const [
    getDashboardUserMatrics,
    { data: isUserMatricsData, isLoading: isUserMatricsLoading },
  ] = useLazyGetUserMatricsQuery();
  const [
    getDashboardUserMatricsWithParams,
    {
      data: isUserMatricsDataWithParams,
      isFetching: isUserMatricsFetchingWithParams,
    },
  ] = useLazyGetUserMatricsWithParamsQuery();
  const [
    getDashboardEventMatrics,
    { data: isEventMatricsData, isLoading: isEventMatricsLoading },
  ] = useLazyGetEventMatricsQuery();
  const [
    getDashboardTeamMatrics,
    { data: isTeamMatricsData, isLoading: isTeamMatricsLoading },
  ] = useLazyGetTeamMatricsQuery();
  const [
    getDashboardRoleMatrics,
    { data: isRoleMatricsData, isLoading: isRoleMatricsLoading },
  ] = useLazyGetRoleMatricsQuery();
  //Global State
  const eventsTabList = useSelector(
    (state) => state.dashboardEventsTabState.dashboardEventsTab
  );
  const userMatrics = useSelector(
    (state) => state.dashboardUserMatricsState.dashboardUserMatrics
  );
  const userMatricsWithParams = useSelector(
    (state) =>
      state.dashboardUserMatricsWithParamsState.dashboardUserMatricsWithParams
  );
  const eventMatrics = useSelector(
    (state) => state.dashboardEventMatricsState.dashboardEventMatrics
  );
  const teamMatrics = useSelector(
    (state) => state.dashboardTeamMatricsState.dashboardTeamMatrics
  );
  const roleMatrics = useSelector(
    (state) => state.dashboardRoleMatricsState.dashboardRoleMatrics
  );

  useEffect(() => {
    async function fetchData() {
      await getDashboardEventsTab({});
      await getDashboardUserMatrics({});
      await getDashboardEventMatrics({});
      await getDashboardTeamMatrics({});
      await getDashboardRoleMatrics({});
    }
    fetchData();
  }, []);

  useEffect(() => {
    setEventLength({
      ...eventLength,
      liveEventLength: eventsTabList?.live?.length,
      recentEventsLength: eventsTabList?.recent?.length,
      upcomingEventsLength: eventsTabList?.upcoming?.length,
      todayEventCount: eventMatrics ? eventMatrics[0]?.count : "0",
      tomorrowEventCount: eventMatrics ? eventMatrics[1]?.count : "0",
    });

    setUserMatricsCount({
      ...userMatricsCount,
      staffCount: userMatrics ? userMatrics[0]?.count : "0",
      coachCount: userMatrics ? userMatrics[1]?.count : "0",
      playersCount: userMatrics ? userMatrics[3]?.count : "0",
      fanCount: userMatrics ? userMatrics[2]?.count : "0",
      inivitedStaffCount: userMatricsWithParams
        ? userMatricsWithParams[0]?.count
        : "0",
      inivitedCoachCount: userMatricsWithParams
        ? userMatricsWithParams[1]?.count
        : "0",
      inivitedPlayersCount: userMatricsWithParams
        ? userMatricsWithParams[3]?.count
        : "0",
      inivitedFanCount: userMatricsWithParams
        ? userMatricsWithParams[2]?.count
        : "0",
    });
    setRoleMatricsCount({
      ...roleMatricsCount,
      videoStreamCount: roleMatrics ? roleMatrics?.videoStreamer : "0",
      scorerCount: roleMatrics ? roleMatrics.scorer : "0",
      pcKeeperCount: roleMatrics ? roleMatrics?.pitchCountKeeper : "0",
      keeperCount: roleMatrics ? roleMatrics?.battingInfoKeeper : "0",
    });
  }, [
    isUserMatricsFetchingWithParams,
    isUserMatricsLoading,
    getDashboardUserMatricsWithParams,
    userMatricsWithParams,
    isRoleMatricsLoading,
    getDashboardRoleMatrics,
    roleMatrics,
  ]);

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
    if (
      !isUserMatricsFetchingWithParams &&
      isUserMatricsDataWithParams?.code === 0
    ) {
      dispatch(
        getDashboardUserMatricsWithParamsDispatch(
          isUserMatricsDataWithParams?.data
        )
      );
    }
    if (!isRoleMatricsLoading && isRoleMatricsData?.code === 0) {
      dispatch(getDashboardRoleMatricsDispatch(isRoleMatricsData?.data));
    }
  }, [
    isUserMatricsFetchingWithParams,
    isUserMatricsLoading,
    isEventMatricsLoading,
    isTeamMatricsLoading,
    isUserMatricsLoading,
    isLoading,
    data?.data,
    isUserMatricsData?.data,
    isEventMatricsData?.data,
    isTeamMatricsData?.data,
    isRoleMatricsData?.data,
    isUserMatricsDataWithParams?.data,
    data?.code,
    isUserMatricsData?.code,
    isEventMatricsData?.code,
    isTeamMatricsData?.code,
    isUserMatricsDataWithParams?.code,
    dispatch,
  ]);

  useEffect(() => {
    if (eventsType === "invited") {
      getDashboardUserMatricsWithParams({ type: "PENDING" });
    } else if (eventsType === "signedup") {
      getDashboardUserMatricsWithParams({ type: "ACCEPTED" });
    }
  }, [eventsType]);

  useEffect(() => {
    setEventsTotalCount(
      eventLength?.liveEventLength +
        eventLength?.recentEventsLength +
        eventLength?.upcomingEventsLength
    );
    setCompletedCount(
      ((eventLength?.recentEventsLength * 100) / eventsTotalCount).toFixed(0)
    );
    setScheduledCount(
      ((eventLength?.liveEventLength + eventLength?.upcomingEventsLength) *
        100) /
        eventsTotalCount.toFixed(0)
    );
  }, [
    eventLength?.liveEventLength,
    eventLength?.recentEventsLength,
    eventLength?.upcomingEventsLength,
    eventsTotalCount,
    getDashboardEventsTab,
    isLoading,
    isUserMatricsFetchingWithParams,
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
          <a className="ms-2" style={{ fontSize: FONT_SIZE.XS }} href="/eventsList">
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
                <h1>{eventLength?.todayEventCount}</h1>
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
                <h1>{eventLength?.tomorrowEventCount}</h1>
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
                <h1>{`${completedCount}%`}</h1>
                <h5 style={{ fontSize: 17.5 }}>Completed</h5>
              </div>
              <Icon icon="charm:tick" color="white" width="40" height="40" />
            </div>
          </div>
          <div className="col-sm-3 col-md-6 col-lg-3 my-lg-0 my-2">
            <div className="bg-primary text-white rounded p-3 d-flex justify-content-between card_style4 align-items-center">
              <div>
                <h1>{`${scheduledCount}%`}</h1>
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
                  options={{
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
                        columnWidth: "50%",
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
                        `Live ${eventLength?.liveEventLength}`,
                        `Recent ${eventLength?.recentEventsLength}`,
                        `Upcoming ${eventLength?.upcomingEventsLength}`,
                      ],
                      labels: {
                        style: {
                          colors: eventsTabColors,
                          fontSize: "12px",
                        },
                      },
                    },
                  }}
                  series={[
                    {
                      data: [
                        eventLength?.liveEventLength,
                        eventLength?.recentEventsLength,
                        eventLength?.upcomingEventsLength,
                      ],
                    },
                  ]}
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
                      {teamMatrics
                        ? teamMatrics?.Elementary +
                          teamMatrics?.["Middle schools"] +
                          teamMatrics?.["High schools"] +
                          teamMatrics?.Schools +
                          teamMatrics?.["Local Leagues"] +
                          teamMatrics?.Travel
                        : 0}
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
                      <td>
                        {teamMatrics ? teamMatrics?.["Local Leagues"] : 0}
                      </td>
                    </tr>
                    <tr
                      style={{
                        fontSize: FONT_SIZE.S,
                      }}
                    >
                      <td>{"Travel"}</td>
                      <td>{teamMatrics ? teamMatrics?.Travel : 0}</td>
                    </tr>
                    <tr
                      style={{
                        fontSize: FONT_SIZE.S,
                      }}
                    >
                      <td>{"Schools"}</td>
                      <td>
                        {teamMatrics
                          ? teamMatrics?.Elementary +
                            teamMatrics?.["Middle schools"] +
                            teamMatrics?.["High schools"] +
                            teamMatrics?.Schools
                          : 0}
                      </td>
                    </tr>
                    <tr
                      style={{
                        fontSize: FONT_SIZE.S,
                      }}
                    >
                      <td className="ps-5">{"- Elementary"}</td>
                      <td>{teamMatrics ? teamMatrics?.Elementary : 0}</td>
                    </tr>
                    <tr
                      style={{
                        fontSize: FONT_SIZE.S,
                      }}
                    >
                      <td className="ps-5">{"- Middle Schools"}</td>
                      <td>
                        {teamMatrics ? teamMatrics?.["Middle schools"] : 0}
                      </td>
                    </tr>
                    <tr
                      style={{
                        fontSize: FONT_SIZE.S,
                      }}
                    >
                      <td className="ps-5">{"- High School"}</td>
                      <td>{teamMatrics ? teamMatrics?.["High schools"] : 0}</td>
                    </tr>
                    <tr
                      style={{
                        fontSize: FONT_SIZE.S,
                      }}
                    >
                      <td className="ps-5">{"- College"}</td>
                      <td>{teamMatrics ? teamMatrics?.Schools : 0}</td>
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
                  options={{
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
                        columnWidth: "50%",
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
                        `Staff ${userMatricsCount?.staffCount}`,
                        `Coach ${userMatricsCount?.coachCount}`,
                        `Player ${userMatricsCount?.playersCount}`,
                        `Fan ${userMatricsCount?.fanCount}`,
                      ],
                      labels: {
                        style: {
                          colors: userMatricsColors,
                          fontSize: "12px",
                        },
                      },
                    },
                  }}
                  series={[
                    {
                      data: [
                        userMatricsCount?.staffCount,
                        userMatricsCount?.coachCount,
                        userMatricsCount?.playersCount,
                        userMatricsCount?.fanCount,
                      ],
                    },
                  ]}
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
              <div className="d-flex m-3 px-3 py-2 bg-light">
                <Icon icon="bi:file-person-fill" width={20} height={20} />
                <span className="ms-2" style={{ fontSize: FONT_SIZE.S }}>
                  Staffs
                </span>
                <span style={{ fontSize: FONT_SIZE.S, marginLeft: "auto" }}>
                  {eventsType === "all"
                    ? userMatricsCount?.staffCount
                    : userMatricsCount?.inivitedStaffCount}
                </span>
              </div>
              <div className="d-flex justify-content-between m-3 px-3 py-2 bg-light">
                <Icon icon="mdi:people-group" width={20} height={20} />
                <span className="ms-2" style={{ fontSize: FONT_SIZE.S }}>
                  Coaches
                </span>
                <span style={{ fontSize: FONT_SIZE.S, marginLeft: "auto" }}>
                  {eventsType === "all"
                    ? userMatricsCount?.coachCount
                    : userMatricsCount?.inivitedCoachCount}
                </span>
              </div>
              <div className="d-flex justify-content-between m-3 px-3 py-2 bg-light">
                <Icon icon="mdi:baseball-bat" width={20} height={20} />
                <span className="ms-2" style={{ fontSize: FONT_SIZE.S }}>
                  Players
                </span>
                <span style={{ fontSize: FONT_SIZE.S, marginLeft: "auto" }}>
                  {eventsType === "all"
                    ? userMatricsCount?.playersCount
                    : userMatricsCount?.inivitedPlayersCount}
                </span>
              </div>
              <div className="d-flex justify-content-between m-3 px-3 py-2 bg-light">
                <Icon icon="f7:person-2-fill" width={20} height={20} />
                <span className="ms-2" style={{ fontSize: FONT_SIZE.S }}>
                  Fans
                </span>
                <span style={{ fontSize: FONT_SIZE.S, marginLeft: "auto" }}>
                  {eventsType === "all"
                    ? userMatricsCount?.fanCount
                    : userMatricsCount?.inivitedFanCount}
                </span>
              </div>
            </div>
            <div className="border mt-4 rounded-1">
              <div className="border-bottom">
                <div className="d-flex justify-content-between">
                  <h6
                    className="p-3"
                    style={{ fontWeight: "bold", marginBottom: 0 }}
                  >
                    Role Matrics
                  </h6>
                </div>
              </div>
              <div className="d-flex m-3 px-3 py-2 bg-light">
                <Icon icon="typcn:video" width="20" height="20" />
                <span className="ms-2" style={{ fontSize: FONT_SIZE.S }}>
                  Video Streamer
                </span>
                <span style={{ fontSize: FONT_SIZE.S, marginLeft: "auto" }}>
                  {roleMatricsCount?.videoStreamCount}
                </span>
              </div>
              <div className="d-flex m-3 px-3 py-2 bg-light">
                <Icon icon="clarity:computer-solid" width="20" height="20" />
                <span className="ms-2" style={{ fontSize: FONT_SIZE.S }}>
                  Scorer
                </span>
                <span style={{ fontSize: FONT_SIZE.S, marginLeft: "auto" }}>
                  {roleMatricsCount?.scorerCount}
                </span>
              </div>
              <div className="d-flex m-3 px-3 py-2 bg-light">
                <Icon icon="mdi:baseball-bat" width={20} height={20} />
                <span className="ms-2" style={{ fontSize: FONT_SIZE.S }}>
                  PC Keeper
                </span>
                <span style={{ fontSize: FONT_SIZE.S, marginLeft: "auto" }}>
                  {roleMatricsCount?.pcKeeperCount}
                </span>
              </div>
              <div className="d-flex m-3 px-3 py-2 bg-light">
                <Icon icon="mdi:person" width="20" height="20" />
                <span className="ms-2" style={{ fontSize: FONT_SIZE.S }}>
                  Keeper
                </span>
                <span style={{ fontSize: FONT_SIZE.S, marginLeft: "auto" }}>
                  {roleMatricsCount?.keeperCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardScreen;
