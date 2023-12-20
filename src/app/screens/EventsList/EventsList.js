import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import { Icon } from "@iconify/react";
import { useLazyGetEventsListQuery } from "../../redux/services/TeamsListService";
import { useDispatch, useSelector } from "react-redux";
import { getEventsListDispatch } from "../../redux/slices/TeamsListSlice";
import CircleLoading from "../../components/CircleLoading";
import { FONT_SIZE } from "../../utils/constants";

const EventsList = () => {
  const EventsTab = [
    { id: 1, title: "Live Events", type: "live" },
    { id: 2, title: "Recent Events", type: "recent" },
    { id: 3, title: "Upcoming Events", type: "upcoming" },
  ];

  const dispatch = useDispatch();
  const [isSearch, setIsSearch] = useState("");
  const [getEventsList, { isLoading, data, isFetching }] =
    useLazyGetEventsListQuery();
  const [eventsType, setEventsType] = useState("live");
  const eventsList = useSelector((state) => state.teamsListState.eventsList);

  useEffect(() => {
    getEventsList({ search: isSearch, type: eventsType });
  }, [getEventsList, isSearch]);

  useEffect(() => {
    if (!isLoading && data?.code === 0) {
      dispatch(getEventsListDispatch(data?.data));
    }
  }, [data?.code, isLoading]);

  return (
    <div>
      <div className="container-fluid p-0">
        <Header />
        <div className="container-fluid border-top">
          <div className="col">
            <h5 className="m-3">Events</h5>
          </div>
          <div className="container-fluid border">
            <div
              className=" d-flex align-items-center border-bottom my-3"
              style={{ justifyContent: "center" }}
            >
              <div className="d-sm-flex col-sm-12 align-items-center justify-center">
                <div
                  className="d-sm-flex col-sm-6 mt-sm-4 mb-3 flex-md-column flex-lg-row justify-content-lg-start"
                  style={{ display: "grid", justifyContent: "center" }}
                >
                  {EventsTab.map((item, index) => (
                    <button
                      key={item.id}
                      className={`btn d-flex ${
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
                <div
                  className="d-sm-flex col-sm-6 px-sm-2 mb-2 justify-center flex-md-column flex-lg-row"
                  style={{ justifyContent: "end" }}
                >
                  <SearchBar
                    className={"search-container d-sm-flex"}
                    value={isSearch}
                    onChange={(text) => {
                      setIsSearch(text.target.value);
                    }}
                    CloseBtnOnClick={() => setIsSearch("")}
                  />
                  <button
                    type="button"
                    className="btn d-flex btn-primary mt-lg-0 mt-2 ms-3"
                    style={{ alignSelf: "center", flex: "none" }}
                  >
                    <Icon
                      icon="ion:document-text-outline"
                      color="white"
                      width="16"
                      height="16"
                    />
                    <h6 className="mb-0 ms-2">Export Report</h6>
                  </button>
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
                {eventsList.length !== 0 ? (
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
                              <h6
                                style={{
                                  justifyContent: "center",
                                  display: "flex",
                                  marginBottom: "10px",
                                }}
                              >
                                No live events found
                              </h6>
                            ) : (
                              <div className="row mt-3">
                                <div class="table-responsive">
                                  <table className={"table"}>
                                    <tr>
                                      <th
                                        className={
                                          "bg-light border-top border-bottom py-2 ps-2"
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
                                      {eventsList.recent.map((item, index) => (
                                        <tr
                                          key={index}
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          <td>
                                            {(index + 1)
                                              .toString()
                                              .padStart(2, "0")}
                                          </td>
                                          <td>{item.event_type}</td>
                                          <td>
                                            {item.scrimmage ? "Yes" : "No"}
                                          </td>
                                          <td>{item.playing_team}</td>
                                          <td>{item.opponent_team}</td>
                                          <td>{item.location}</td>
                                          <td
                                            className={`ps-2 ${
                                              item.progress === "Completed"
                                                ? "text_primary"
                                                : "text_secondary"
                                            }`}
                                          >
                                            {item.progress}
                                          </td>
                                          <td
                                            className={`${
                                              item.game_status === "END"
                                                ? "text_primary"
                                                : "text_secondary"
                                            }`}
                                          >
                                            {item.game_status}
                                          </td>
                                          <td>
                                            {new Date(
                                              item.game_start_date
                                            ).toLocaleDateString()}
                                          </td>
                                          <td>
                                            {new Date(
                                              item.game_start_date
                                            ).toLocaleTimeString("en-US", {
                                              hour: "2-digit",
                                              minute: "2-digit",
                                              hour12: true,
                                            })}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
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
                              <h6
                                style={{
                                  justifyContent: "center",
                                  display: "flex",
                                  marginBottom: "10px",
                                }}
                              >
                                No recent events found
                              </h6>
                            ) : (
                              <div className="row mt-3">
                                <div class="table-responsive">
                                  <table className={"table"}>
                                    <tr>
                                      <th
                                        className={
                                          "bg-light border-top border-bottom py-2 ps-2"
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
                                      {eventsList.recent.map((item, index) => (
                                        <tr
                                          key={index}
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          <td>
                                            {(index + 1)
                                              .toString()
                                              .padStart(2, "0")}
                                          </td>
                                          <td>{item.event_type}</td>
                                          <td>
                                            {item.scrimmage ? "Yes" : "No"}
                                          </td>
                                          <td>{item.playing_team}</td>
                                          <td>{item.opponent_team}</td>
                                          <td>{item.location}</td>
                                          <td
                                            className={`ps-2 ${
                                              item.progress === "Completed"
                                                ? "text_primary"
                                                : "text_secondary"
                                            }`}
                                          >
                                            {item.progress}
                                          </td>
                                          <td
                                            className={`${
                                              item.game_status === "END"
                                                ? "text_primary"
                                                : "text_secondary"
                                            }`}
                                          >
                                            {item.game_status}
                                          </td>
                                          <td>
                                            {new Date(
                                              item.game_start_date
                                            ).toLocaleDateString()}
                                          </td>
                                          <td>
                                            {new Date(
                                              item.game_start_date
                                            ).toLocaleTimeString("en-US", {
                                              hour: "2-digit",
                                              minute: "2-digit",
                                              hour12: true,
                                            })}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
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
                              <h6
                                style={{
                                  justifyContent: "center",
                                  display: "flex",
                                  marginBottom: "10px",
                                }}
                              >
                                No upcoming events found
                              </h6>
                            ) : (
                              <div className="row mt-3">
                                <div class="table-responsive">
                                  <table className={"table"}>
                                    <tr>
                                      <th
                                        className={
                                          "bg-light border-top border-bottom py-2 ps-2"
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
                                      {eventsList.recent.map((item, index) => (
                                        <tr
                                          key={index}
                                          style={{
                                            fontSize: FONT_SIZE.S,
                                          }}
                                        >
                                          <td>
                                            {(index + 1)
                                              .toString()
                                              .padStart(2, "0")}
                                          </td>
                                          <td>{item.event_type}</td>
                                          <td>
                                            {item.scrimmage ? "Yes" : "No"}
                                          </td>
                                          <td>{item.playing_team}</td>
                                          <td>{item.opponent_team}</td>
                                          <td>{item.location}</td>
                                          <td
                                            className={`ps-2 ${
                                              item.progress === "Completed"
                                                ? "text_primary"
                                                : "text_secondary"
                                            }`}
                                          >
                                            {item.progress}
                                          </td>
                                          <td
                                            className={`${
                                              item.game_status === "END"
                                                ? "text_primary"
                                                : "text_secondary"
                                            }`}
                                          >
                                            {item.game_status}
                                          </td>
                                          <td>
                                            {new Date(
                                              item.game_start_date
                                            ).toLocaleDateString()}
                                          </td>
                                          <td>
                                            {new Date(
                                              item.game_start_date
                                            ).toLocaleTimeString("en-US", {
                                              hour: "2-digit",
                                              minute: "2-digit",
                                              hour12: true,
                                            })}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
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
