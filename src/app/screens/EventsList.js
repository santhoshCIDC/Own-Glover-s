import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { Icon } from "@iconify/react";
import { useLazyGetEventsListQuery } from "../redux/services/TeamsListService";
import { useDispatch, useSelector } from "react-redux";
import { getEventsListDispatch } from "../redux/slices/TeamsListSlice";
import CircleLoading from "../components/CircleLoading";
import { FONT_SIZE } from "../utils/constants";
import Pagination from "../components/Pagination";
import DropdownItem from "../components/DropdownItem";
import jsPDF from "jspdf";
import "jspdf-autotable";

const EventsList = () => {
  const itemsPerPage = 10;
  const EventsTab = [
    { id: 1, title: "Live Events", type: "live" },
    { id: 2, title: "Recent Events", type: "recent" },
    { id: 3, title: "Upcoming Events", type: "upcoming" },
  ];

  const dispatch = useDispatch();
  const [isSearch, setIsSearch] = useState("");
  const [dropdownOverlay, setDropdownOverlay] = useState("");
  const [pdfList, setPdfList] = useState([]);
  const [csvList, setCsvList] = useState([]);
  const [getEventsList, { isLoading, data, isFetching }] =
    useLazyGetEventsListQuery();
  const [eventsType, setEventsType] = useState("live");
  const [page, setPage] = useState({
    currentPageForLiveList: 1,
    currentPageForRecentList: 1,
    currentPageForUpcomingList: 1,
  });
  const eventsList = useSelector((state) => state.teamsListState.eventsList);

  useEffect(() => {
    getEventsList({ search: isSearch, type: eventsType });
  }, [getEventsList, isSearch, eventsType]);

  useEffect(() => {
    if (!isLoading && data?.code === 0) {
      dispatch(getEventsListDispatch(data?.data));
    }
  }, [data?.code, isLoading, isFetching]);

  const renderCSVData = ({ item }) => {
    const modifiedCsvData = item.map((entry) => ({
      ...entry,
      scrimmage: entry.scrimmage ? "Yes" : "No",
    }));

    // Remove unwanted keys from each object in modifiedCsvData
    const filteredCsvData = modifiedCsvData.map(
      ({ _id, game_start_date, place, created_at, ...rest }) => rest
    );

    setCsvList(filteredCsvData);
    return filteredCsvData;
  };

  useEffect(() => {
    if (eventsType === "live") {
      setPdfList(eventsList?.live);
      renderCSVData({ item: eventsList?.live || [] });
    } else if (eventsType === "recent") {
      setPdfList(eventsList?.recent);
      renderCSVData({ item: eventsList?.recent || [] });
    } else {
      setPdfList(eventsList?.upcoming);
      renderCSVData({ item: eventsList?.upcoming || [] });
    }
  }, [eventsType]);

  //live
  const indexOfLastPostForLiveList = page.currentPageForLiveList * itemsPerPage;
  const indexOfFirstPostForLiveList = indexOfLastPostForLiveList - itemsPerPage;
  //recent
  const indexOfLastPostForRecentList =
    page.currentPageForRecentList * itemsPerPage;
  const indexOfFirstPostForRecentList =
    indexOfLastPostForRecentList - itemsPerPage;
  //upcoming
  const indexOfLastPostForUpcomingtList =
    page.currentPageForUpcomingList * itemsPerPage;
  const indexOfFirstPostForUpcomingList =
    indexOfLastPostForUpcomingtList - itemsPerPage;

  const paginate = (number, type) => {
    if (type === "live") {
      setPage({ ...page, currentPageForLiveList: number });
    } else if (type === "recent") {
      setPage({ ...page, currentPageForRecentList: number });
    } else {
      setPage({ ...page, currentPageForUpcomingList: number });
    }
  };

  const handleMouseOver = (menu) => {
    setDropdownOverlay(menu);
  };

  const handleMouseOut = () => {
    setDropdownOverlay("");
  };

  const pdfExport = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title =
      eventsType === "live"
        ? "Live Events List"
        : eventsType === "recent"
        ? "Recent Events List"
        : "Upcoming Events List";

    const headers = [
      [
        "EVENT TYPE",
        "SCRIMAGE",
        "PLAYING TEAM",
        "OPPONENT TEAM",
        "LOCATION",
        "PROGRESS",
        "RESULT",
        "CREATED DATE",
      ],
    ];
    const data = pdfList?.map((elt) => [
      elt.event_type,
      elt.scrimmage ? "Yes" : "No",
      elt.playing_team,
      elt.opponent_team,
      elt.location,
      elt.progress,
      elt.game_status,
      new Date(elt.game_start_date).toLocaleDateString(),
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");
  };

  return (
    <div>
      <div className="container-fluid p-0">
        <Header />
        <div className="container-fluid border-top">
          <div className="col">
            <h5 className="m-3">Events</h5>
          </div>
          <div className="container-fluid border">
            <div className=" d-flex align-items-center border-bottom">
              <div className="d-xl-flex col-sm-12 align-items-center justify-content-between my-3">
                <div className="d-sm-flex align-items-center">
                  {EventsTab &&
                    EventsTab.length > 0 &&
                    EventsTab.map((item, index) => (
                      <button
                        key={item.id}
                        className={`btn d-flex pt-2 align-items-end ${
                          eventsType === item.type ? "active-button" : ""
                        }`}
                        style={{
                          border: "none",
                          cursor:
                            eventsType === item.type ? "default" : "pointer",
                        }}
                        onClick={() => setEventsType(item.type)}
                      >
                        <h6
                          className={`fw-bold text-nowrap ${
                            eventsType === item.type ? "active-text-color" : ""
                          }`}
                        >
                          {item.title}
                        </h6>
                      </button>
                    ))}
                </div>
                <div className="d-sm-flex">
                  <SearchBar
                    className={"search-container ms-ms-0 ms-3"}
                    value={isSearch}
                    onChange={(text) => {
                      setIsSearch(text.target.value);
                    }}
                    CloseBtnOnClick={() => setIsSearch("")}
                  />
                  <div class="dropdown">
                    <button
                      type="button"
                      className="btn btn-primary d-flex align-items-center ms-sm-3 ms-0 me-xl-5 me-0"
                      data-bs-toggle="dropdown"
                      style={{
                        fontSize: FONT_SIZE.S,
                        minWidth: "fit-content",
                        backgroundColor: "#3796f3",
                        borderColor: "#3796f3",
                      }}
                    >
                      <Icon
                        className="me-2"
                        icon="ion:document-text-outline"
                        color="white"
                        width="16"
                        height="16"
                      />
                      Export Report
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <DropdownItem
                          icon="heroicons:document-text"
                          text="CSV Format"
                          color="#2d6efd"
                          overlay={dropdownOverlay === "menu1"}
                          onMouseOver={() => handleMouseOver("menu1")}
                          onMouseOut={handleMouseOut}
                          CSVFormat={true}
                          csvData={csvList}
                          filename={
                            eventsType === "live"
                              ? "Live Events List"
                              : eventsType === "recent"
                              ? "Recent Events List"
                              : "Upcoming Events List"
                          }
                        />
                      </li>
                      <li>
                        <DropdownItem
                          icon="heroicons:document-plus"
                          text="PDF Format"
                          color="#575757"
                          overlay={dropdownOverlay === "menu2"}
                          onMouseOver={() => handleMouseOver("menu2")}
                          onMouseOut={handleMouseOut}
                          onClick={() => pdfExport()}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {isLoading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                }}
              >
                <CircleLoading />
              </div>
            ) : (
              <>
                {eventsList && eventsList.length !== 0 ? (
                  <>
                    {eventsType === "live" && (
                      <>
                        {isFetching ? (
                          <div
                            className="d-flex justify-content-center align-items-center"
                            style={{
                              position: "absolute",
                              left: "50%",
                              top: "50%",
                            }}
                          >
                            <CircleLoading />
                          </div>
                        ) : (
                          <>
                            {eventsList?.live?.length === 0 ? (
                              <h6 className="my-3 d-flex justify-content-center">
                                No live events found
                              </h6>
                            ) : (
                              <>
                                <div className="row mt-3">
                                  <div class="table-responsive">
                                    <table className={"table"}>
                                      <tr>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-3 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          S No.
                                        </th>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-3 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          Event Type
                                        </th>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-3 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          Scrimmage
                                        </th>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-3 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          Playing Team
                                        </th>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-3 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          Opponent Team
                                        </th>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-3 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          Location
                                        </th>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-3 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          Progress
                                        </th>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-3 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          Result
                                        </th>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-3 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          Game Date
                                        </th>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-3 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          Time
                                        </th>
                                      </tr>
                                      <tbody>
                                        {eventsList.live &&
                                          eventsList.live
                                            .slice(
                                              indexOfFirstPostForLiveList,
                                              indexOfLastPostForLiveList
                                            )
                                            .map((item, index) => (
                                              <tr
                                                key={index}
                                                style={{
                                                  fontSize: FONT_SIZE.S,
                                                }}
                                              >
                                                <td className="table_list">
                                                  {(index + 1)
                                                    .toString()
                                                    .padStart(2, "0")}
                                                </td>
                                                <td className="table_list">
                                                  {item.event_type}
                                                </td>
                                                <td className="table_list">
                                                  {item.scrimmage
                                                    ? "Yes"
                                                    : "No"}
                                                </td>
                                                <td className="table_list">
                                                  {item.playing_team}
                                                </td>
                                                <td className="table_list">
                                                  {item.opponent_team}
                                                </td>
                                                <td className="table_list">
                                                  {item.location}
                                                </td>
                                                <td className="ps-2 text_red_color table_list">
                                                  {item.progress}
                                                </td>
                                                <td className="text_red_color table_list">
                                                  {item.game_status}
                                                </td>
                                                <td className="table_list">
                                                  {new Date(
                                                    item.game_start_date
                                                  ).toLocaleDateString()}
                                                </td>
                                                <td className="table_list">
                                                  {new Date(
                                                    item.game_start_date
                                                  ).toLocaleTimeString(
                                                    "en-US",
                                                    {
                                                      hour: "2-digit",
                                                      minute: "2-digit",
                                                      hour12: true,
                                                    }
                                                  )}
                                                </td>
                                              </tr>
                                            ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                                <>
                                  {eventsList?.live !== undefined &&
                                    eventsList?.live?.length > 10 && (
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "flex-end",
                                          marginTop: "10px",
                                        }}
                                      >
                                        <Pagination
                                          itemsPerPage={itemsPerPage}
                                          totalItems={eventsList?.live?.length}
                                          paginate={paginate}
                                          currentPage={
                                            page.currentPageForLiveList
                                          }
                                          type={"live"}
                                          setPrevBtn={() =>
                                            setPage({
                                              ...page,
                                              currentPageForLiveList:
                                                page.currentPageForLiveList - 1,
                                            })
                                          }
                                          setNextBtn={() =>
                                            setPage({
                                              ...page,
                                              currentPageForLiveList:
                                                page.currentPageForLiveList + 1,
                                            })
                                          }
                                        />
                                      </div>
                                    )}
                                </>
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                    {eventsType === "recent" && (
                      <>
                        {isFetching ? (
                          <div
                            className="d-flex justify-content-center align-items-center"
                            style={{
                              position: "absolute",
                              left: "50%",
                              top: "50%",
                            }}
                          >
                            <CircleLoading />
                          </div>
                        ) : (
                          <>
                            {eventsList?.recent?.length === 0 ? (
                              <h6 className="my-3 d-flex justify-content-center">
                                No recent events found
                              </h6>
                            ) : (
                              <>
                                <div className="row mt-3">
                                  <div class="table-responsive">
                                    <table className={"table"}>
                                      <tr>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-3 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          S No.
                                        </th>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-2 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          Event Type
                                        </th>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-2 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          Scrimmage
                                        </th>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-2 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          Playing Team
                                        </th>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-2 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          Opponent Team
                                        </th>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-2 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          Location
                                        </th>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-2 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          Progress
                                        </th>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-2 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          Result
                                        </th>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-2 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          Game Date
                                        </th>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-2 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          Time
                                        </th>
                                      </tr>
                                      <tbody>
                                        {eventsList.recent &&
                                          eventsList.recent
                                            .slice(
                                              indexOfFirstPostForRecentList,
                                              indexOfLastPostForRecentList
                                            )
                                            .map((item, index) => (
                                              <tr
                                                key={index}
                                                style={{
                                                  fontSize: FONT_SIZE.S,
                                                }}
                                              >
                                                <td className="table_list">
                                                  {(index + 1)
                                                    .toString()
                                                    .padStart(2, "0")}
                                                </td>
                                                <td className="table_list">
                                                  {item.event_type}
                                                </td>
                                                <td className="table_list">
                                                  {item.scrimmage
                                                    ? "Yes"
                                                    : "No"}
                                                </td>
                                                <td className="table_list">
                                                  {item.playing_team}
                                                </td>
                                                <td className="table_list">
                                                  {item.opponent_team}
                                                </td>
                                                <td className="table_list">
                                                  {item.location}
                                                </td>
                                                <td
                                                  className={`ps-2 table_list ${
                                                    item.progress ===
                                                    "Completed"
                                                      ? "text_primary"
                                                      : "text_secondary"
                                                  }`}
                                                >
                                                  {item.progress}
                                                </td>
                                                <td
                                                  className={`table_list ${
                                                    item.game_status === "END"
                                                      ? "text_primary"
                                                      : "text_secondary"
                                                  }`}
                                                >
                                                  {item.game_status}
                                                </td>
                                                <td className="table_list">
                                                  {new Date(
                                                    item.game_start_date
                                                  ).toLocaleDateString()}
                                                </td>
                                                <td className="table_list">
                                                  {new Date(
                                                    item.game_start_date
                                                  ).toLocaleTimeString(
                                                    "en-US",
                                                    {
                                                      hour: "2-digit",
                                                      minute: "2-digit",
                                                      hour12: true,
                                                    }
                                                  )}
                                                </td>
                                              </tr>
                                            ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                                <>
                                  {eventsList?.recent !== undefined &&
                                    eventsList?.recent?.length > 10 && (
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "flex-end",
                                          marginTop: "10px",
                                        }}
                                      >
                                        <Pagination
                                          itemsPerPage={itemsPerPage}
                                          totalItems={
                                            eventsList?.recent?.length
                                          }
                                          paginate={paginate}
                                          currentPage={
                                            page?.currentPageForRecentList
                                          }
                                          type={"recent"}
                                          setPrevBtn={() =>
                                            setPage({
                                              ...page,
                                              currentPageForRecentList:
                                                page.currentPageForRecentList -
                                                1,
                                            })
                                          }
                                          setNextBtn={() =>
                                            setPage({
                                              ...page,
                                              currentPageForRecentList:
                                                page.currentPageForRecentList +
                                                1,
                                            })
                                          }
                                        />
                                      </div>
                                    )}
                                </>
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                    {eventsType === "upcoming" && (
                      <>
                        {isFetching ? (
                          <div
                            className="d-flex justify-content-center align-items-center"
                            style={{
                              position: "absolute",
                              left: "50%",
                              top: "50%",
                            }}
                          >
                            <CircleLoading />
                          </div>
                        ) : (
                          <>
                            {eventsList?.upcoming?.length === 0 ? (
                              <h6 className="my-3 d-flex justify-content-center">
                                No upcoming events found
                              </h6>
                            ) : (
                              <>
                                <div className="row mt-3">
                                  <div class="table-responsive">
                                    <table className={"table"}>
                                      <tr>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-3 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          S No.
                                        </th>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-3 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          Event Type
                                        </th>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-3 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          Scrimmage
                                        </th>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-3 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          Playing Team
                                        </th>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-3 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          Opponent Team
                                        </th>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-3 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          Location
                                        </th>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-3 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          Progress
                                        </th>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-3 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          Result
                                        </th>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-3 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          Game Date
                                        </th>
                                        <th
                                          className={
                                            "bg-light border-top border-bottom py-3 ps-2"
                                          }
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          Time
                                        </th>
                                      </tr>
                                      <tbody>
                                        {eventsList.upcoming &&
                                          eventsList.upcoming
                                            .slice(
                                              indexOfFirstPostForUpcomingList,
                                              indexOfLastPostForUpcomingtList
                                            )
                                            .map((item, index) => (
                                              <tr
                                                key={index}
                                                style={{
                                                  fontSize: FONT_SIZE.S,
                                                }}
                                              >
                                                <td className="table_list">
                                                  {(index + 1)
                                                    .toString()
                                                    .padStart(2, "0")}
                                                </td>
                                                <td className="table_list">
                                                  {item.event_type}
                                                </td>
                                                <td className="table_list">
                                                  {item.scrimmage
                                                    ? "Yes"
                                                    : "No"}
                                                </td>
                                                <td className="table_list">
                                                  {item.playing_team}
                                                </td>
                                                <td className="table_list">
                                                  {item.opponent_team}
                                                </td>
                                                <td className="table_list">
                                                  {item.location}
                                                </td>
                                                <td
                                                  className="ps-2 fw-bold table_list"
                                                  style={{ color: "green" }}
                                                >
                                                  {item.progress}
                                                </td>
                                                <td
                                                  className="ps-2 fw-bold table_list"
                                                  style={{ color: "green" }}
                                                >
                                                  {item.game_status}
                                                </td>
                                                <td className="table_list">
                                                  {new Date(
                                                    item.game_start_date
                                                  ).toLocaleDateString()}
                                                </td>
                                                <td className="table_list">
                                                  {new Date(
                                                    item.game_start_date
                                                  ).toLocaleTimeString(
                                                    "en-US",
                                                    {
                                                      hour: "2-digit",
                                                      minute: "2-digit",
                                                      hour12: true,
                                                    }
                                                  )}
                                                </td>
                                              </tr>
                                            ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                                <>
                                  {eventsList?.upcoming !== undefined &&
                                    eventsList?.upcoming?.length > 10 && (
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "flex-end",
                                          marginTop: "10px",
                                        }}
                                      >
                                        <Pagination
                                          itemsPerPage={itemsPerPage}
                                          totalItems={
                                            eventsList?.upcoming?.length
                                          }
                                          paginate={paginate}
                                          currentPage={
                                            page.currentPageForUpcomingList
                                          }
                                          type={"live"}
                                          setPrevBtn={() =>
                                            setPage({
                                              ...page,
                                              currentPageForUpcomingList:
                                                page.currentPageForUpcomingList -
                                                1,
                                            })
                                          }
                                          setNextBtn={() =>
                                            setPage({
                                              ...page,
                                              currentPageForUpcomingList:
                                                page.currentPageForUpcomingList +
                                                1,
                                            })
                                          }
                                        />
                                      </div>
                                    )}
                                </>
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsList;
