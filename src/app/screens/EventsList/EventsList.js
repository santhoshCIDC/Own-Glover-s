import React, { useState } from "react";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import LiveEventsList from "./LiveEventsList";
import RecentEventsList from "./RecentEventsList";
import UpcomingEventsList from "./UpcomingEventsList";
import { Icon } from "@iconify/react";

const EventsList = () => {
  const EventsTab = [
    { id: 1, title: "Live Events" },
    { id: 2, title: "Recent Events" },
    { id: 3, title: "Upcoming Events" },
  ];

  const [eventsTabIndex, setEventsTabIndex] = useState(0);
  const [isSearch, setIsSearch] = useState("");
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
                        eventsTabIndex === index ? "active-button" : ""
                      }`}
                      style={{
                        border: "none",
                        cursor:
                          eventsTabIndex === index ? "default" : "pointer",
                      }}
                      onClick={() => setEventsTabIndex(index)}
                    >
                      <h6
                        className={`fw-bold text-nowrap ${
                          eventsTabIndex === index ? "active-text-color" : ""
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
            {eventsTabIndex === 0 ? (
              <LiveEventsList />
            ) : eventsTabIndex === 1 ? (
              <RecentEventsList />
            ) : eventsTabIndex === 2 ? (
              <UpcomingEventsList />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsList;
