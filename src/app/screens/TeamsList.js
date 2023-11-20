import React, { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { Icon } from "@iconify/react";
import TableContainer from "../components/TableContainer";

const TeamsList = () => {
  const [isSearch, setIsSearch] = useState("");
  const INITIAL_STATE = [
    {
      sNo: "01",
      teamName: "American",
      teamType: "School",
      ageGroup: "Middle School",
      season: "Summer 2023-2024",
      location: "Boston,MA",
    },
    {
      sNo: "02",
      teamName: "Arizona Diamondbacks",
      teamType: "Local League / Rec / Other",
      ageGroup: "Over 18",
      season: "Summer 2023-2024",
      location: "Las Cruces,NM",
    },
    {
      sNo: "03",
      teamName: "Astros",
      teamType: "Local League / Rec / Other",
      ageGroup: "Over 18",
      season: "Spring 2023",
      location: "Dallas,TX",
    },
    {
      sNo: "04",
      teamName: "Atlanta Braves",
      teamType: "School",
      ageGroup: "Elementary",
      season: "Spring 2023",
      location: "Seattle,WA",
    },
  ];
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
                  <button
                    className="btn w-10"
                    style={{
                      marginRight: "1vw",
                      border: "none",
                      cursor: "default",
                    }}
                  >
                    <h6 className=" fw-bold active-text-color text-nowrap">
                      Teams List
                    </h6>
                  </button>
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
            <TableContainer data={INITIAL_STATE} />
            {/* {eventsTabIndex === 0 ? (
              <LiveEventsList />
            ) : eventsTabIndex === 1 ? (
              <RecentEventsList />
            ) : eventsTabIndex === 2 ? (
              <UpcomingEventsList />
            ) : null} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsList;
