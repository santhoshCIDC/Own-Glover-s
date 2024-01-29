import React, { useEffect, useState } from "react";
import { FONT_SIZE } from "../utils/constants";
import { useGlobalSearchMutation } from "../redux/services/DashboardService";
import { useDispatch, useSelector } from "react-redux";
import { globalSearchDispatch } from "../redux/slices/DashboardSlice";
import Pagination from "./Pagination";
import { loader } from "./Loader";

const GlobalSearch = ({ isSearch }) => {
  // local state
  const itemsPerPage = 5;
  const dispatch = useDispatch();
  const [page, setPage] = useState({
    currentPageForGlobalList: 1,
  });

  // global state
  const global = useSelector((state) => state.globalSearchState.globalSearch);
  //api call
  const [globalSearch, { data, isLoading, isSuccess }] =
    useGlobalSearchMutation();

  // component did mount
  useEffect(() => {
    let globalSearchReq = {
      type: "users",
      search: isSearch,
    };
    globalSearch(globalSearchReq);
  }, [isSearch]);

  useEffect(() => {
    if (!isLoading && data?.code === 0) {
      dispatch(globalSearchDispatch(data?.data));
    }
  }, [globalSearch, isSuccess]);

  const paginate = (number, type) => {
    if (type === "global") {
      setPage({ ...page, currentPageForGlobalList: number });
    }
  };

  const indexOfLastPostForGlobalList =
    page.currentPageForGlobalList * itemsPerPage;
  const indexOfFirstPostForGlobalList =
    indexOfLastPostForGlobalList - itemsPerPage;

  return (
    <div className="table-row-deactive mt-3 p-4 m-md-5 m-0">
      {isLoading ? (
        <div className="my-3 d-flex justify-content-center">{loader()}</div>
      ) : (
        <>
          {global?.length === 0 ? (
            <h6 className="my-3 d-flex justify-content-center">
              No data found
            </h6>
          ) : (
            <>
              <div className="row ">
                <div className="d-flex">
                  <h5>Showing result</h5>
                  <h5 className="ms-2 fw-bold">{global?.length}</h5>
                </div>
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
                        F Name
                      </th>
                      <th
                        className={
                          "bg-light border-top border-bottom py-2 ps-2"
                        }
                        style={{
                          fontSize: FONT_SIZE.S,
                        }}
                      >
                        L Name
                      </th>
                      <th
                        className={
                          "bg-light border-top border-bottom py-2 ps-2"
                        }
                        style={{
                          fontSize: FONT_SIZE.S,
                        }}
                      >
                        Email
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
                    </tr>
                    <tbody>
                      {global
                        ?.slice(
                          indexOfFirstPostForGlobalList,
                          indexOfLastPostForGlobalList
                        )
                        ?.map((item, index) => (
                          <tr
                            key={index}
                            style={{
                              fontSize: FONT_SIZE.S,
                            }}
                          >
                            <td className="table-row-deactive">
                              {(
                                (page?.currentPageForGlobalList - 1) * 5 +
                                index +
                                1
                              )
                                .toString()
                                .padStart(2, "0")}
                            </td>
                            <td className="table-row-deactive">
                              {item.first_name}
                            </td>
                            <td className="table-row-deactive">
                              {item.last_name}
                            </td>
                            <td className="table-row-deactive">{item.email}</td>
                            <td className="table-row-deactive">
                              {item.team_name}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                {global !== undefined && global?.length > 5 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "10px",
                    }}
                  >
                    <Pagination
                      itemsPerPage={itemsPerPage}
                      totalItems={global?.length}
                      paginate={paginate}
                      currentPage={page?.currentPageForGlobalList}
                      type="global"
                      setPrevBtn={() =>
                        setPage({
                          ...page,
                          currentPageForGlobalList:
                            page.currentPageForGlobalList - 1,
                        })
                      }
                      setNextBtn={() =>
                        setPage({
                          ...page,
                          currentPageForGlobalList:
                            page.currentPageForGlobalList + 1,
                        })
                      }
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default GlobalSearch;
