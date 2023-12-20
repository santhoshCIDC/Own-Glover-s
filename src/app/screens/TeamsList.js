import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { Icon } from "@iconify/react";
import { useLazyGetTeamsListQuery } from "../redux/services/TeamsListService";
import { useDispatch, useSelector } from "react-redux";
import { getTeamsListDispatch } from "../redux/slices/TeamsListSlice";
import CircleLoading from "../components/CircleLoading";
import { FONT_SIZE } from "../utils/constants";
import Pagination from "../components/Pagination";

const TeamsList = () => {
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const [isSearch, setIsSearch] = useState("");
  const [getTeamsList, { data, isLoading }] = useLazyGetTeamsListQuery();
  const teamsList = useSelector((state) => state.teamsListState.teamsList);
  const [page, setPage] = useState({
    currentPageForTeamList: 1,
  });

  useEffect(() => {
    getTeamsList();
  }, [getTeamsList]);

  useEffect(() => {
    if (!isLoading && data?.code === 0) {
      dispatch(getTeamsListDispatch(data?.data));
    }
  }, [data?.code, isLoading]);

  const paginate = (number, type) => {
    if (type === "Team") {
      setPage({ ...page, currentPageForTeamList: number });
    }
  };

  const indexOfLastPostForTeamList =
    page.currentPageForTeamList * itemsPerPage;
  const indexOfFirstPostForTeamList =
    indexOfLastPostForTeamList - itemsPerPage;

  const onButtonClick = () => {
    // using Java Script method to get PDF file
    fetch("SamplePDF.pdf").then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);

        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "SamplePDF.pdf";
        alink.click();
      });
    });
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
                    onClick={onButtonClick}
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
                style={{ position: "absolute", left: "50%", top: "50%" }}
              >
                <CircleLoading />
              </div>
            ) : (
              <>
                {teamsList !== undefined && teamsList !== null && (
                  <>
                    {teamsList?.length === 0 ? (
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
                                Team Name
                              </th>
                              <th
                                className={
                                  "bg-light border-top border-bottom py-2 ps-2"
                                }
                                style={{
                                  fontSize: FONT_SIZE.S,
                                }}
                              >
                                Team Type
                              </th>
                              <th
                                className={
                                  "bg-light border-top border-bottom py-2 ps-2"
                                }
                                style={{
                                  fontSize: FONT_SIZE.S,
                                }}
                              >
                                Age Group
                              </th>
                              <th
                                className={
                                  "bg-light border-top border-bottom py-2 ps-2"
                                }
                                style={{
                                  fontSize: FONT_SIZE.S,
                                }}
                              >
                                Season
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
                            </tr>
                            <tbody>
                              {teamsList
                                .slice(
                                  indexOfFirstPostForTeamList,
                                  indexOfLastPostForTeamList
                                )
                                ?.map((item, index) => (
                                  <tr
                                    key={index}
                                    style={{
                                      fontSize: FONT_SIZE.S,
                                    }}
                                  >
                                    <td>
                                      {(
                                    (page?.currentPageForTeamList - 1) * 10 +
                                    index +
                                    1
                                  )
                                    .toString()
                                    .padStart(2, "0")}
                                    </td>
                                    <td>{item.team_name}</td>
                                    <td>{item.team_type}</td>
                                    <td>{item.age_value}</td>
                                    <td>{item.season_name}</td>
                                    <td>{item.address}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    {teamsList !== undefined && teamsList?.length > 10 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "10px",
                      }}
                    >
                      <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={teamsList?.length}
                        paginate={paginate}
                        currentPage={page?.currentPageForTeamList}
                        type="Team"
                        setPrevBtn={() =>
                          setPage({
                            ...page,
                            currentPageForTeamList:
                              page.currentPageForTeamList - 1,
                          })
                        }
                        setNextBtn={() =>
                          setPage({
                            ...page,
                            currentPageForTeamList:
                              page.currentPageForTeamList + 1,
                          })
                        }
                      />
                    </div>
                  )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsList;
