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
import DropdownItem from "../components/DropdownItem";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { CSVLink } from "react-csv";

const TeamsList = () => {
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const [isSearch, setIsSearch] = useState("");
  const [dropdownOverlay, setDropdownOverlay] = useState("");

  const [getTeamsList, { data, isLoading, isFetching }] =
    useLazyGetTeamsListQuery();
  const teamsList = useSelector((state) => state.teamsListState.teamsList);
  const [page, setPage] = useState({
    currentPageForTeamList: 1,
  });

  useEffect(() => {
    getTeamsList({ search: isSearch });
  }, [getTeamsList, isSearch]);

  useEffect(() => {
    if (!isLoading && data?.code === 0) {
      dispatch(getTeamsListDispatch(data?.data));
    }
  }, [data?.code, isLoading, isFetching]);

  const paginate = (number, type) => {
    if (type === "Team") {
      setPage({ ...page, currentPageForTeamList: number });
    }
  };

  const indexOfLastPostForTeamList = page.currentPageForTeamList * itemsPerPage;
  const indexOfFirstPostForTeamList = indexOfLastPostForTeamList - itemsPerPage;

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

    const title = "Team List";

    const headers = [
      ["TEAM NAME", "TEAM TYPE", "AGE GROUP", "SEASON", "LOCATION"],
    ];

    const data = teamsList?.map((elt) => [
      elt.team_name,
      elt.team_type,
      elt.age_value,
      elt.season_name,
      elt.address,
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
  const csvData = teamsList?.map((object) => {
    const { _id, game_type, ...rest } = object;
    return rest;
  });
  console.log("fkadsjfkdhsfhads", csvData);
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
              <div className="d-lg-flex col-sm-12 align-items-center justify-content-between my-3">
                <div className="d-flex align-items-center">
                  <button
                    className="btn d-flex pt-2 align-items-end active-button"
                    style={{
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <h6 className="fw-bold text-nowrap active-text-color">
                      {"Team List"}
                    </h6>
                  </button>
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
                          csvData={csvData}
                          filename={"Team List"}
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
                style={{ position: "absolute", left: "50%", top: "50%" }}
              >
                <CircleLoading />
              </div>
            ) : (
              <>
                {teamsList !== undefined && teamsList !== null && (
                  <>
                    {teamsList?.length === 0 ? (
                      <h6 className="my-3 d-flex justify-content-center">
                        No teams found
                      </h6>
                    ) : (
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
                                      Team Name
                                    </th>
                                    <th
                                      className={
                                        "bg-light border-top border-bottom py-3 ps-2"
                                      }
                                      style={{
                                        fontSize: FONT_SIZE.S,
                                      }}
                                    >
                                      Team Type
                                    </th>
                                    <th
                                      className={
                                        "bg-light border-top border-bottom py-3 ps-2"
                                      }
                                      style={{
                                        fontSize: FONT_SIZE.S,
                                      }}
                                    >
                                      Age Group
                                    </th>
                                    <th
                                      className={
                                        "bg-light border-top border-bottom py-3 ps-2"
                                      }
                                      style={{
                                        fontSize: FONT_SIZE.S,
                                      }}
                                    >
                                      Season
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
                                          <td className="table_list">
                                            {(
                                              (page?.currentPageForTeamList -
                                                1) *
                                                10 +
                                              index +
                                              1
                                            )
                                              .toString()
                                              .padStart(2, "0")}
                                          </td>
                                          <td className="table_list">
                                            {item.team_name}
                                          </td>
                                          <td className="table_list">
                                            {item.team_type}
                                          </td>
                                          <td className="table_list">
                                            {item.age_value}
                                          </td>
                                          <td className="table_list">
                                            {item.season_name}
                                          </td>
                                          <td className="table_list">
                                            {item.address}
                                          </td>
                                        </tr>
                                      ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <>
                              {teamsList !== undefined &&
                                teamsList?.length > 10 && (
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
                          </>
                        )}
                      </>
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
