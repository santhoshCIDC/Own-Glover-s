import React, { useEffect, useState } from "react";
import { FONT_SIZE } from "../utils/constants";
import Header from "../components/Header";
import RenderModal from "../components/RenderModal";
import { useLazyGetSeasonListQuery } from "../redux/services/TeamsListService";
import { useDispatch, useSelector } from "react-redux";
import { getSeasonsListDispatch } from "../redux/slices/TeamsListSlice";
import CircleLoading from "../components/CircleLoading";
import { IMAGES } from "../utils/SharedImages";
import Tooltip from "../components/Tooltip";
import moment from "moment";
import Pagination from "../components/Pagination";

const SeasonsScreen = () => {
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [deleteShowModal, setDeleteShowModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [season, setSeason] = useState("");
  const [seasonName, setSeasonName] = useState("");
  const [page, setPage] = useState({
    currentPageForSeasonList: 1,
  });
  const [getSeasonList, { isLoading, data }] = useLazyGetSeasonListQuery();
  const seasonList = useSelector((state) => state.teamsListState.seasonList);

  useEffect(() => {
    getSeasonList();
  }, [getSeasonList]);

  useEffect(() => {
    if (!isLoading && data?.code === 0) {
      dispatch(getSeasonsListDispatch(data?.data));
    }
  }, [data?.code, isLoading]);

  const onClickEdit = (item) => {
    setShowModal(true);
    setEndDate(moment(item.end_date).format("YYYY-MM-DD"));
    setStartDate(moment(item.start_date).format("YYYY-MM-DD"));
    setSeason(item.values);
  };
  const onClickCreateSeason = () => {
    setShowModal(true);
    setEndDate(null);
    setStartDate(null);
    setSeason("");
  };

  const paginate = (number, type) => {
    if (type === "Season") {
      setPage({ ...page, currentPageForSeasonList: number });
    }
  };

  const indexOfLastPostForSeasonList =
    page.currentPageForSeasonList * itemsPerPage;
  const indexOfFirstPostForSeasonList =
    indexOfLastPostForSeasonList - itemsPerPage;

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
              onClick={() => onClickCreateSeason()}
            >
              Create Season
            </button>
          </div>
          <RenderModal
            show={showModal}
            onHide={() => setShowModal(false)}
            closeBtnOnClick={() => setShowModal(false)}
            modaltitle={"Season Name:"}
            modalbody={
              <div>
                <input
                  className="border border-success-subtle border-1 p-1 px-2"
                  placeholder="Season Name"
                  style={{ fontSize: FONT_SIZE.S, borderRadius: 3 }}
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                />
                <h6 className="date-text pt-3">Start Date:</h6>
                <input
                  type="date"
                  className="border border-success-subtle border-1 p-1 px-2"
                  placeholder="dd/mm/yyyy"
                  style={{
                    fontSize: FONT_SIZE.S,
                    borderRadius: 3,
                    width: "100%",
                  }}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <h6 className="date-text pt-3">End Date:</h6>
                <input
                  type="date"
                  className="border border-success-subtle border-1 p-1 px-2"
                  placeholder="dd/mm/yyyy"
                  style={{
                    fontSize: FONT_SIZE.S,
                    borderRadius: 3,
                    width: "100%",
                  }}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            }
            OkText={"Submit"}
            fieldsActive={true}
            okOnClick={() => {}}
          />
          <RenderModal
            show={deleteShowModal}
            onHide={() => setDeleteShowModal(false)}
            closeBtnOnClick={() => setDeleteShowModal(false)}
            modalbody={`Are you sure you want to delete the ${seasonName.values}?`}
            OkText={"Delete"}
            CancelText={"Cancel"}
            logoutModal={true}
            okOnClick={() => {}}
            cancelOnClick={() => setDeleteShowModal(false)}
          />
          {isLoading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ position: "absolute", left: "50%", top: "50%" }}
            >
              <CircleLoading />
            </div>
          ) : (
            <>
              {seasonList !== undefined && seasonList !== null && (
                <>
                  {seasonList?.Season.length === 0 ? (
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
                              Update
                            </th>
                            <th
                              className={
                                "bg-light border-top border-bottom py-2 ps-2"
                              }
                              style={{
                                fontSize: FONT_SIZE.S,
                              }}
                            >
                              Delete
                            </th>
                            <th
                              className={
                                "bg-light border-top border-bottom py-2 ps-2"
                              }
                              style={{
                                fontSize: FONT_SIZE.S,
                              }}
                            >
                              Status
                            </th>
                          </tr>
                          <tbody>
                            {seasonList?.Season.slice(
                              indexOfFirstPostForSeasonList,
                              indexOfLastPostForSeasonList
                            ).map((item, index) => (
                              <tr
                                key={index}
                                style={{
                                  fontSize: FONT_SIZE.S,
                                }}
                              >
                                <td>
                                  {(
                                    (page?.currentPageForSeasonList - 1) * 10 +
                                    index +
                                    1
                                  )
                                    .toString()
                                    .padStart(2, "0")}
                                </td>
                                <td>{item.values}</td>
                                <td>
                                  <img
                                    onClick={() => {
                                      onClickEdit(item);
                                    }}
                                    style={{
                                      height: 15,
                                      width: 15,
                                      cursor: "pointer",
                                    }}
                                    src={IMAGES.pencil_Icon}
                                    alt="pencil"
                                    data-tooltip-id="edit-tooltip"
                                  />
                                </td>
                                <td>
                                  <img
                                    onClick={() => {
                                      setSeasonName(item);
                                      setDeleteShowModal(true);
                                    }}
                                    style={{
                                      height: 20,
                                      width: 20,
                                      cursor: "pointer",
                                    }}
                                    src={IMAGES.delete_Icon}
                                    alt="delete"
                                    data-tooltip-id="delete-tooltip"
                                  />
                                </td>
                                <td
                                  style={{
                                    color: item.season_expired
                                      ? "red"
                                      : "green",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {item.season_expired ? "Expired" : "Active"}
                                </td>
                                <Tooltip id={"edit-tooltip"} content="Edit" />
                                <Tooltip
                                  id={"delete-tooltip"}
                                  content="Delete"
                                />
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {seasonList !== undefined && seasonList?.Season > 10 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "10px",
                      }}
                    >
                      <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={seasonList?.Season?.length}
                        paginate={paginate}
                        currentPage={page?.currentPageForSeasonList}
                        type="Season"
                        setPrevBtn={() =>
                          setPage({
                            ...page,
                            currentPageForSeasonList:
                              page.currentPageForSeasonList - 1,
                          })
                        }
                        setNextBtn={() =>
                          setPage({
                            ...page,
                            currentPageForSeasonList:
                              page.currentPageForSeasonList + 1,
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
  );
};

export default SeasonsScreen;
