import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { Icon } from "@iconify/react";
import Switch from "react-switch";
import { useDispatch, useSelector } from "react-redux";
import CircleLoading from "../components/CircleLoading";
import { FONT_SIZE } from "../utils/constants";
import Pagination from "../components/Pagination";
import { loader } from "../components/Loader";
import {
  useLazyGetCoachesListQuery,
  useLazyGetFansListQuery,
  useLazyGetPlayersListQuery,
  useLazyGetStaffsListQuery,
  useTeamResponsibilityMutation,
  useUpdateCoachStatusMutation,
  useUpdateFanStatusMutation,
  useUpdatePlayerStatusMutation,
  useUpdateStaffStatusMutation,
} from "../redux/services/UsersListService";
import {
  getCoachesListDispatch,
  getFansListDispatch,
  getPlayersListDispatch,
  getStaffsListDispatch,
  teamResponsibilityDispatch,
} from "../redux/slices/UsersListSlice";
import RenderModal from "../components/RenderModal";
import DropdownItem from "../components/DropdownItem";
import jsPDF from "jspdf";
import "jspdf-autotable";

const UserListScreen = () => {
  // Global State
  const coachesList = useSelector((state) => state.usersListState.coachesList);
  const staffsList = useSelector((state) => state.usersListState.staffsList);
  const playersList = useSelector((state) => state.usersListState.playersList);
  const fansList = useSelector((state) => state.usersListState.fansList);
  const teamResponsibility = useSelector(
    (state) => state.usersListState.teamResponsibility
  );

  // Local State
  const EventsTab = [
    { id: 1, title: "Coach", type: "coach" },
    { id: 2, title: "Staff", type: "staff" },
    { id: 3, title: "Player", type: "player" },
    { id: 4, title: "Fan", type: "fan" },
  ];
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const [isSearch, setIsSearch] = useState("");
  const [toggleOn, setToggleOn] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [activeItems, setActiveItems] = useState({});
  const [eventsType, setEventsType] = useState("coach");
  const [userStatusFilter, setUserStatusFilter] = useState("all");
  const [responsibilityFilter, setResponsibilityFilter] = useState("");
  const [userStatusCoachFilter, setUserStatusCoachFilter] =
    useState(coachesList);
  const [userStatusStaffFilter, setUserStatusStaffFilter] =
    useState(staffsList);
  const [responsibilityStaffFilter, setResponsibilityStaffFilter] =
    useState(staffsList);
  const [toggleOnModal, setToggleOnModal] = useState(false);
  const [page, setPage] = useState({
    currentPageForCoachList: 1,
    currentPageForStaffList: 1,
    currentPageForPlayerList: 1,
    currentPageForFanList: 1,
  });
  const [dropdownOverlay, setDropdownOverlay] = useState("");
  const [pdfList, setPdfList] = useState([]);
  const [csvList, setCsvList] = useState([]);

  // API call
  const [
    getCoachesList,
    { isFetching: isCoachFetching, isLoading: isCoachLoading, data: coachData },
  ] = useLazyGetCoachesListQuery();
  const [
    getStaffsList,
    { isFetching: isStaffFetching, isLoading: isStaffLoading, data: staffData },
  ] = useLazyGetStaffsListQuery();
  const [
    getPlayersList,
    {
      isFetching: isPlayerFetching,
      isLoading: isPlayerLoading,
      data: playerData,
    },
  ] = useLazyGetPlayersListQuery();
  const [
    getFansList,
    { isFetching: isFanFetching, isLoading: isFanLoading, data: fanData },
  ] = useLazyGetFansListQuery();
  const [
    teamResponsibilityReq,
    { isLoading: isTeamResponsibilityLoading, data: isTeamResponsibilityData },
  ] = useTeamResponsibilityMutation();
  const [updateCoachStatus, { isSuccess: isUpdateCoachStatusSuccess }] =
    useUpdateCoachStatusMutation();
  const [updateStaffStatus, { isSuccess: isUpdateStaffStatusSuccess }] =
    useUpdateStaffStatusMutation();
  const [updatePlayerStatus, { isSuccess: isUpdatePlayerStatusSuccess }] =
    useUpdatePlayerStatusMutation();
  const [updateFanStatus, { isSuccess: isUpdateFanStatusSuccess }] =
    useUpdateFanStatusMutation();

  useEffect(() => {
    if (eventsType === "coach") {
      getCoachesList({ search: isSearch, type: eventsType });
    } else if (eventsType === "staff") {
      getStaffsList({ search: isSearch, type: eventsType });
    } else if (eventsType === "player") {
      getPlayersList({ search: isSearch, type: eventsType });
    } else {
      getFansList({ search: isSearch, type: eventsType });
    }
  }, [
    getCoachesList,
    isSearch,
    eventsType,
    getStaffsList,
    getPlayersList,
    getFansList,
    isUpdateCoachStatusSuccess,
    isUpdateFanStatusSuccess,
    isUpdatePlayerStatusSuccess,
    isUpdateStaffStatusSuccess,
  ]);

  useEffect(() => {
    if (eventsType === "coach") {
      if (!isCoachLoading && coachData?.code === 0) {
        dispatch(getCoachesListDispatch(coachData?.data));
      }
    } else if (eventsType === "staff") {
      if (!isStaffLoading && staffData?.code === 0) {
        dispatch(getStaffsListDispatch(staffData?.data));
      }
    } else if (eventsType === "player") {
      if (!isPlayerLoading && playerData?.code === 0) {
        dispatch(getPlayersListDispatch(playerData?.data));
      }
    } else {
      if (!isFanLoading && fanData?.code === 0) {
        dispatch(getFansListDispatch(fanData?.data));
      }
    }
  }, [
    isCoachFetching,
    isUpdateCoachStatusSuccess,
    isStaffFetching,
    isUpdateStaffStatusSuccess,
    isPlayerFetching,
    isUpdatePlayerStatusSuccess,
    isFanFetching,
    isUpdateFanStatusSuccess,
  ]);

  useEffect(() => {
    if (!isTeamResponsibilityLoading && isTeamResponsibilityData?.code === 0) {
      dispatch(teamResponsibilityDispatch(isTeamResponsibilityData?.data));
    }
  }, [isTeamResponsibilityLoading]);

  useEffect(() => {
    const activeCoaches = coachesList.filter((item) => item.status);
    const deActiveCoaches = coachesList.filter((item) => !item.status);
    const activeStaffs = staffsList.filter((item) => item.status);
    const deActiveStaffs = staffsList.filter((item) => !item.status);
    if (userStatusFilter === "all") {
      if (eventsType === "coach") {
        setUserStatusCoachFilter(coachesList);
      } else if (eventsType === "staff") {
        setUserStatusStaffFilter(staffsList);
      }
    } else if (userStatusFilter === "activeUsers") {
      if (eventsType === "coach") {
        setUserStatusCoachFilter(activeCoaches);
      } else if (eventsType === "staff") {
        setUserStatusStaffFilter(activeStaffs);
      }
    } else if (userStatusFilter === "deactiveUsers") {
      if (eventsType === "coach") {
        setUserStatusCoachFilter(deActiveCoaches);
      } else if (eventsType === "staff") {
        setUserStatusStaffFilter(deActiveStaffs);
      }
    }
  }, [
    userStatusFilter,
    getCoachesList,
    eventsType,
    responsibilityFilter === null,
  ]);
  const renderCSVData = ({ item }) => {
    const modifiedCsvData = item.map((entry) => ({
      ...entry,
      status: entry.status ? "Active" : "InActive",
      is_subscribe: entry.is_subscribe ? "Active" : "InActive",
    }));

    // Remove unwanted keys from each object in modifiedCsvData
    const filteredCsvData = modifiedCsvData.map(
      ({ _id, created_at, current_subscription_data,role,responsibility, ...rest }) => rest
    );

    setCsvList(filteredCsvData);
    return filteredCsvData;
  };

  useEffect(() => {
    if (eventsType === "coach") {
      setPdfList(coachesList);
      renderCSVData({ item: coachesList || [] });
    } else if (eventsType === "staff") {
      setPdfList(staffsList);
      renderCSVData({ item: staffsList || [] });
    } else if (eventsType === "player") {
      setPdfList(playersList);
      renderCSVData({ item: playersList || [] });
    } else {
      setPdfList(fansList);
      renderCSVData({ item: fansList || [] });
    }
  }, [eventsType]);

  useEffect(() => {
    const bActiveStaffs = staffsList.filter((item) => item.responsibility.b);
    const pcActiveStaffs = staffsList.filter((item) => item.responsibility.pc);
    const scActiveStaffs = staffsList.filter((item) => item.responsibility.sc);
    const vsActiveStaffs = staffsList.filter((item) => item.responsibility.vs);

    if (responsibilityFilter === "") {
      if (eventsType === "staff") {
        setResponsibilityStaffFilter(staffsList);
      }
    } else if (responsibilityFilter === "b") {
      if (eventsType === "staff") {
        setResponsibilityStaffFilter(bActiveStaffs);
      }
    } else if (responsibilityFilter === "pc") {
      if (eventsType === "staff") {
        setResponsibilityStaffFilter(pcActiveStaffs);
      }
    } else if (responsibilityFilter === "sc") {
      if (eventsType === "staff") {
        setResponsibilityStaffFilter(scActiveStaffs);
      }
    } else if (responsibilityFilter === "vs") {
      if (eventsType === "staff") {
        setResponsibilityStaffFilter(vsActiveStaffs);
      }
    }
  }, [responsibilityFilter, getCoachesList, eventsType]);

  const paginate = (number, type) => {
    if (type === "Coach") {
      setPage({ ...page, currentPageForCoachList: number });
    } else if (type === "Staff") {
      setPage({ ...page, currentPageForStaffList: number });
    } else if (type === "Player") {
      setPage({ ...page, currentPageForPlayerList: number });
    } else if (type === "Fan") {
      setPage({ ...page, currentPageForFanList: number });
    }
  };

  const indexOfLastPostForCoachList =
    page.currentPageForCoachList * itemsPerPage;
  const indexOfFirstPostForCoachList =
    indexOfLastPostForCoachList - itemsPerPage;
  const indexOfLastPostForStaffList =
    page.currentPageForStaffList * itemsPerPage;
  const indexOfFirstPostForStaffList =
    indexOfLastPostForStaffList - itemsPerPage;
  const indexOfLastPostForPlayerList =
    page.currentPageForPlayerList * itemsPerPage;
  const indexOfFirstPostForPlayerList =
    indexOfLastPostForPlayerList - itemsPerPage;
  const indexOfLastPostForFanList = page.currentPageForFanList * itemsPerPage;
  const indexOfFirstPostForFanList = indexOfLastPostForFanList - itemsPerPage;

  const onClickView = async (item) => {
    await teamResponsibilityReq({ email: item.email });
  };
  const renderModal = () => {
    return (
      <>
        <RenderModal
          show={toggleOnModal}
          onHide={() => setToggleOnModal(false)}
          closeBtnOnClick={() => setToggleOnModal(false)}
          logoutModal={true}
          modalbody={
            <div className="d-flex">
              <h6 className="fs-6">
                Are you sure you want to{" "}
                {activeItems.status ? "deactivate" : "activate"}
              </h6>
              <h6 className="fs-6 fw-bold ms-1">
                {activeItems?.first_name} {activeItems?.last_name}?
              </h6>
            </div>
          }
          cancelOnClick={() => setToggleOnModal(false)}
          okOnClick={async () => {
            let updateStatusReq = {
              userId: activeItems?._id,
              status: toggleOn ? "ACTIVE" : "INACTIVE",
            };
            if (eventsType === "coach") {
              await updateCoachStatus(updateStatusReq);
            } else if (eventsType === "staff") {
              await updateStaffStatus(updateStatusReq);
            } else if (eventsType === "player") {
              await updatePlayerStatus(updateStatusReq);
            } else {
              await updateFanStatus(updateStatusReq);
            }
            setToggleOnModal(false);
            setActiveModal(false);
          }}
          CancelText={"Cancel"}
          OkText={"Confirm"}
        />
      </>
    );
  };
  const renderActivatedAndDeactivated = () => {
    return (
      <div className="d-flex align-items-center">
        <div
          className="ms-1"
          style={{
            height: 12,
            width: 12,
            backgroundColor: "#2bd144",
          }}
        />
        <span className="ms-1" style={{ fontSize: FONT_SIZE.S }}>
          Activated
        </span>
        <div
          className="ms-2"
          style={{
            height: 12,
            width: 12,
            backgroundColor: "red",
          }}
        />
        <span className="ms-1" style={{ fontSize: FONT_SIZE.S }}>
          Deactivated
        </span>
      </div>
    );
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
      eventsType === "coach"
        ? "Coach List"
        : eventsType === "staff"
        ? "Staff List"
        : eventsType === "player"
        ? "Player List"
        : "Fan List";

    const headers = [["FIRST NAME", "LAST NAME", "EMAIL", "TEAM NAME"]];
    const data = pdfList?.map((elt) => [
      elt.first_name,
      elt.last_name,
      elt.email,
      elt.team_name,
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
            <h5 className="m-3">Users</h5>
          </div>
          <div className="container-fluid border">
            <div className=" d-flex align-items-center border-bottom">
              <div className="d-xl-flex col-sm-12 align-items-center justify-content-between my-3">
                <div className="d-flex align-items-center">
                  {EventsTab.map((item, index) => (
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
                      onClick={() => {
                        setEventsType(item.type);
                        setUserStatusFilter("all");
                        setResponsibilityFilter("b");
                      }}
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
                      className="btn btn-primary dropdown-toggle d-flex align-items-center ms-sm-3 ms-0"
                      data-bs-toggle="dropdown"
                      style={{
                        fontSize: FONT_SIZE.S,
                        minWidth: "fit-content",
                        backgroundColor: "#42bcd4",
                        borderColor: "#42bcd4",
                      }}
                    >
                      <Icon
                        className="me-2"
                        icon="la:id-card"
                        color="white"
                        width="20"
                        height="20"
                      />
                      User Status
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <DropdownItem
                          icon="la:id-card"
                          text="All"
                          color="#575757"
                          overlay={dropdownOverlay === "all"}
                          onMouseOver={() => handleMouseOver("all")}
                          onMouseOut={handleMouseOut}
                          onClick={() => {
                            setUserStatusFilter("all");
                            setResponsibilityStaffFilter(null);
                          }}
                        />
                      </li>
                      <li>
                        <DropdownItem
                          icon="la:id-card"
                          text="Activated Users"
                          color="#575757"
                          overlay={dropdownOverlay === "activatedUsers"}
                          onMouseOver={() => handleMouseOver("activatedUsers")}
                          onMouseOut={handleMouseOut}
                          onClick={() => {
                            setUserStatusFilter("activeUsers");
                            setResponsibilityStaffFilter(null);
                          }}
                        />
                      </li>
                      <li>
                        <DropdownItem
                          icon="la:id-card"
                          text="Deactivated Users"
                          color="#575757"
                          overlay={dropdownOverlay === "deactivatedUsers"}
                          onMouseOver={() =>
                            handleMouseOver("deactivatedUsers")
                          }
                          onMouseOut={handleMouseOut}
                          onClick={() => {
                            setUserStatusFilter("deactiveUsers");
                            setResponsibilityStaffFilter(null);
                          }}
                        />
                      </li>
                    </ul>
                  </div>
                  {eventsType === "staff" && (
                    <div class="dropdown">
                      <button
                        type="button"
                        className="btn btn-primary d-flex align-items-center ms-sm-3 ms-0"
                        data-bs-toggle="dropdown"
                        style={{
                          fontSize: FONT_SIZE.S,
                          minWidth: "fit-content",
                          backgroundColor: "#673ab7",
                          borderColor: "#673ab7",
                        }}
                      >
                        <Icon
                          className="me-2"
                          icon="cil:tag"
                          color="white"
                          width="16"
                          height="16"
                        />
                        Responsibility
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <div
                            className="d-flex align-items-center"
                            style={{ margin: "5px" }}
                            onClick={() => {
                              setResponsibilityFilter("b");
                              setUserStatusStaffFilter(null);
                            }}
                          >
                            <Icon icon="cil:tag" width="20" height="20" />
                            <span className="user-filter">b</span>
                          </div>
                        </li>
                        <li>
                          <div
                            className="d-flex align-items-center"
                            style={{ margin: "5px" }}
                            onClick={() => {
                              setResponsibilityFilter("pc");
                              setUserStatusStaffFilter(null);
                            }}
                          >
                            <Icon icon="cil:tag" width="20" height="20" />
                            <span className="user-filter">pc</span>
                          </div>
                        </li>
                        <li>
                          <div
                            className="d-flex align-items-center"
                            style={{ margin: "5px" }}
                            onClick={() => {
                              setResponsibilityFilter("sc");
                              setUserStatusStaffFilter(null);
                            }}
                          >
                            <Icon icon="cil:tag" width="20" height="20" />
                            <span className="user-filter">sc</span>
                          </div>
                        </li>
                        <li>
                          <div
                            className="d-flex align-items-center"
                            style={{ margin: "5px" }}
                            onClick={() => {
                              setResponsibilityFilter("vs");
                              setUserStatusStaffFilter(null);
                            }}
                          >
                            <Icon icon="cil:tag" width="20" height="20" />
                            <span className="user-filter">vc</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
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
                          csvData={csvList}
                          CSVFormat={true}
                          filename={
                            eventsType === "coach"
                              ? "Coach List"
                              : eventsType === "staff"
                              ? "Staff List"
                              : eventsType === "player"
                              ? "Player List"
                              : "Fan List"
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
            {isCoachLoading ? (
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
                {coachesList.length !== 0 ? (
                  <>
                    {eventsType === "coach" && (
                      <>
                        {isCoachFetching ? (
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
                            {userStatusCoachFilter?.length === 0 ? (
                              <h6 className="my-3 d-flex justify-content-center">
                                No coaches found
                              </h6>
                            ) : (
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
                                        F Name
                                      </th>
                                      <th
                                        className={
                                          "bg-light border-top border-bottom py-3 ps-2"
                                        }
                                        style={{
                                          fontSize: FONT_SIZE.S,
                                        }}
                                      >
                                        L Name
                                      </th>
                                      <th
                                        className={
                                          "bg-light border-top border-bottom py-3 ps-2"
                                        }
                                        style={{
                                          fontSize: FONT_SIZE.S,
                                        }}
                                      >
                                        Email
                                      </th>
                                      <th
                                        className={
                                          "bg-light border-top border-bottom py-3 ps-2"
                                        }
                                        style={{
                                          fontSize: FONT_SIZE.S,
                                        }}
                                      >
                                        Subscription Status
                                      </th>
                                      <th
                                        className={
                                          "bg-light border-top border-bottom py-3 ps-2"
                                        }
                                        style={{
                                          fontSize: FONT_SIZE.S,
                                        }}
                                      >
                                        Action
                                      </th>
                                      {renderModal()}
                                      {activeModal && (
                                        <Modal
                                          show={activeModal}
                                          onHide={() => setActiveModal(false)}
                                          size={"md"}
                                          aria-labelledby="contained-modal-title-vcenter"
                                          centered
                                        >
                                          <button
                                            type="button"
                                            class="btn-close align-self-end p-3"
                                            aria-label="Close"
                                            onClick={() =>
                                              setActiveModal(false)
                                            }
                                          />
                                          <div className="modal-contents ">
                                            <Modal.Header className="border-0 p-0">
                                              <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body className="p-3 border-top border-bottom w-100 d-flex justify-content-center">
                                              {isTeamResponsibilityLoading ? (
                                                loader()
                                              ) : (
                                                <>
                                                  {teamResponsibility.length ===
                                                  0 ? (
                                                    " No data found"
                                                  ) : (
                                                    <div className="row w-100">
                                                      <div class="table-responsive ">
                                                        <table
                                                          className={"table"}
                                                        >
                                                          <tr>
                                                            <th
                                                              className={
                                                                "bg-light border-top border-bottom py-2 ps-2"
                                                              }
                                                              style={{
                                                                fontSize:
                                                                  FONT_SIZE.S,
                                                              }}
                                                            >
                                                              Team Name
                                                            </th>
                                                            <th
                                                              className={
                                                                "bg-light border-top border-bottom py-2 ps-2"
                                                              }
                                                              style={{
                                                                fontSize:
                                                                  FONT_SIZE.S,
                                                              }}
                                                            >
                                                              Responsibility
                                                            </th>
                                                            <th
                                                              className={
                                                                "bg-light border-top border-bottom py-2 ps-2"
                                                              }
                                                              style={{
                                                                fontSize:
                                                                  FONT_SIZE.S,
                                                              }}
                                                            >
                                                              User Status
                                                            </th>
                                                          </tr>
                                                          <tbody>
                                                            {teamResponsibility.map(
                                                              (item, index) => (
                                                                <tr
                                                                  key={index}
                                                                  style={{
                                                                    fontSize:
                                                                      FONT_SIZE.S,
                                                                  }}
                                                                >
                                                                  <td>
                                                                    {
                                                                      item.team_name
                                                                    }
                                                                  </td>
                                                                  <td>
                                                                    <div className="d-flex align-items-center">
                                                                      <span className="ms-1">
                                                                        b
                                                                      </span>
                                                                      <div
                                                                        className="ms-1"
                                                                        style={{
                                                                          height: 15,
                                                                          width: 15,
                                                                          backgroundColor:
                                                                            item
                                                                              .responsibility
                                                                              .b
                                                                              ? "#2bd144"
                                                                              : "red",
                                                                        }}
                                                                      />
                                                                      <span className="ms-1">
                                                                        pc
                                                                      </span>
                                                                      <div
                                                                        className="ms-1"
                                                                        style={{
                                                                          height: 15,
                                                                          width: 15,
                                                                          backgroundColor:
                                                                            item
                                                                              .responsibility
                                                                              .pc
                                                                              ? "#2bd144"
                                                                              : "red",
                                                                        }}
                                                                      />
                                                                      <span className="ms-1">
                                                                        sc
                                                                      </span>
                                                                      <div
                                                                        className="ms-1"
                                                                        style={{
                                                                          height: 15,
                                                                          width: 15,
                                                                          backgroundColor:
                                                                            item
                                                                              .responsibility
                                                                              .sc
                                                                              ? "#2bd144"
                                                                              : "red",
                                                                        }}
                                                                      />
                                                                      <span className="ms-1">
                                                                        vs
                                                                      </span>
                                                                      <div
                                                                        className="ms-1"
                                                                        style={{
                                                                          height: 15,
                                                                          width: 15,
                                                                          backgroundColor:
                                                                            item
                                                                              .responsibility
                                                                              .vs
                                                                              ? "#2bd144"
                                                                              : "red",
                                                                        }}
                                                                      />
                                                                    </div>
                                                                  </td>
                                                                  <td>
                                                                    <Switch
                                                                      key={item}
                                                                      checked={
                                                                        item.status
                                                                      }
                                                                      onColor="#2bd144"
                                                                      offColor="#ff0707"
                                                                      checkedIcon={
                                                                        false
                                                                      }
                                                                      handleDiameter={
                                                                        21
                                                                      }
                                                                      height={
                                                                        25
                                                                      }
                                                                      uncheckedIcon={
                                                                        false
                                                                      }
                                                                      onChange={() => {
                                                                        setToggleOn(
                                                                          item.status
                                                                            ? false
                                                                            : true
                                                                        );
                                                                        setActiveItems(
                                                                          item
                                                                        );
                                                                        setToggleOnModal(
                                                                          true
                                                                        );
                                                                      }}
                                                                    />
                                                                  </td>
                                                                </tr>
                                                              )
                                                            )}
                                                          </tbody>
                                                        </table>
                                                      </div>
                                                    </div>
                                                  )}
                                                </>
                                              )}
                                            </Modal.Body>

                                            <Modal.Footer
                                              className="border-0"
                                              style={{ marginLeft: "auto" }}
                                            >
                                              <button
                                                type="button"
                                                className={
                                                  "btn btn-danger py-1"
                                                }
                                                onClick={() =>
                                                  setActiveModal(false)
                                                }
                                                style={{
                                                  cursor: "pointer",
                                                }}
                                              >
                                                Close
                                              </button>
                                            </Modal.Footer>
                                          </div>
                                        </Modal>
                                      )}
                                    </tr>
                                    <tbody>
                                      {userStatusCoachFilter &&
                                        userStatusCoachFilter
                                          .slice(
                                            indexOfFirstPostForCoachList,
                                            indexOfLastPostForCoachList
                                          )
                                          .map((item, index) => (
                                            <tr
                                              key={index}
                                              style={{
                                                fontSize: FONT_SIZE.S,
                                              }}
                                            >
                                              <td
                                                className={
                                                  item.status
                                                    ? " table-row-active text-nowrap"
                                                    : "table-row-deactive text-nowrap"
                                                }
                                              >
                                                {(
                                                  (page?.currentPageForCoachList -
                                                    1) *
                                                    10 +
                                                  index +
                                                  1
                                                )
                                                  .toString()
                                                  .padStart(2, "0")}
                                              </td>
                                              <td
                                                className={
                                                  item.status
                                                    ? " table-row-active text-nowrap"
                                                    : "table-row-deactive text-nowrap"
                                                }
                                              >
                                                {item.first_name}
                                              </td>
                                              <td
                                                className={
                                                  item.status
                                                    ? " table-row-active text-nowrap"
                                                    : "table-row-deactive text-nowrap"
                                                }
                                              >
                                                {item.last_name}
                                              </td>
                                              <td
                                                className={
                                                  item.status
                                                    ? " table-row-active text-nowrap"
                                                    : "table-row-deactive text-nowrap"
                                                }
                                              >
                                                {item.email}
                                              </td>
                                              {item.is_subscribe ? (
                                                <td
                                                  className={
                                                    item.status
                                                      ? " table-row-active text-nowrap"
                                                      : "table-row-deactive text-nowrap"
                                                  }
                                                  style={{
                                                    color: "green",
                                                    fontWeight: "bold",
                                                  }}
                                                >
                                                  Active
                                                </td>
                                              ) : (
                                                <td
                                                  className={
                                                    item.status
                                                      ? " table-row-active text-nowrap"
                                                      : "table-row-deactive text-nowrap"
                                                  }
                                                  style={{
                                                    color: "red",
                                                    fontWeight: "bold",
                                                  }}
                                                >
                                                  InActive
                                                </td>
                                              )}
                                              <td
                                                className={
                                                  item.status
                                                    ? " table-row-active text-nowrap"
                                                    : "table-row-deactive text-nowrap"
                                                }
                                              >
                                                <button
                                                  type="button"
                                                  className={
                                                    "btn btn-primarys p-1 px-2"
                                                  }
                                                  onClick={() => {
                                                    onClickView(item);
                                                    setActiveModal(true);
                                                  }}
                                                  style={{
                                                    cursor: "pointer",
                                                  }}
                                                >
                                                  View
                                                </button>
                                              </td>
                                            </tr>
                                          ))}
                                    </tbody>
                                  </table>
                                </div>
                                <div className="d-sm-flex justify-content-between">
                                  {renderActivatedAndDeactivated()}
                                  {userStatusCoachFilter !== undefined &&
                                    userStatusCoachFilter?.length > 10 && (
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
                                            userStatusCoachFilter?.length
                                          }
                                          paginate={paginate}
                                          currentPage={
                                            page?.currentPageForCoachList
                                          }
                                          type="Coach"
                                          setPrevBtn={() =>
                                            setPage({
                                              ...page,
                                              currentPageForCoachList:
                                                page.currentPageForCoachList -
                                                1,
                                            })
                                          }
                                          setNextBtn={() =>
                                            setPage({
                                              ...page,
                                              currentPageForCoachList:
                                                page.currentPageForCoachList +
                                                1,
                                            })
                                          }
                                        />
                                      </div>
                                    )}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )}

                    {eventsType === "staff" && (
                      <>
                        {isStaffFetching ? (
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
                            {(
                              userStatusStaffFilter || responsibilityStaffFilter
                            )?.length === 0 ? (
                              <h6 className="my-3 d-flex justify-content-center">
                                No staffs found
                              </h6>
                            ) : (
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
                                        F Name
                                      </th>
                                      <th
                                        className={
                                          "bg-light border-top border-bottom py-3 ps-2"
                                        }
                                        style={{
                                          fontSize: FONT_SIZE.S,
                                        }}
                                      >
                                        L Name
                                      </th>
                                      <th
                                        className={
                                          "bg-light border-top border-bottom py-3 ps-2"
                                        }
                                        style={{
                                          fontSize: FONT_SIZE.S,
                                        }}
                                      >
                                        Email
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
                                        Responsibility
                                      </th>
                                      <th
                                        className={
                                          "bg-light border-top border-bottom py-3 ps-2"
                                        }
                                        style={{
                                          fontSize: FONT_SIZE.S,
                                        }}
                                      >
                                        User Status
                                      </th>
                                      {renderModal()}
                                    </tr>
                                    <tbody>
                                      {(userStatusStaffFilter ||
                                        responsibilityStaffFilter) &&
                                        (
                                          userStatusStaffFilter ||
                                          responsibilityStaffFilter
                                        )
                                          .slice(
                                            indexOfFirstPostForStaffList,
                                            indexOfLastPostForStaffList
                                          )
                                          .map((item, index) => (
                                            <tr
                                              key={index}
                                              style={{
                                                fontSize: FONT_SIZE.S,
                                              }}
                                            >
                                              <td
                                                className={
                                                  item.status
                                                    ? " table-row-active text-nowrap"
                                                    : "table-row-deactive text-nowrap"
                                                }
                                              >
                                                {(
                                                  (page?.currentPageForStaffList -
                                                    1) *
                                                    10 +
                                                  index +
                                                  1
                                                )
                                                  .toString()
                                                  .padStart(2, "0")}
                                              </td>
                                              <td
                                                className={
                                                  item.status
                                                    ? " table-row-active text-nowrap"
                                                    : "table-row-deactive text-nowrap"
                                                }
                                              >
                                                {item.first_name}
                                              </td>
                                              <td
                                                className={
                                                  item.status
                                                    ? " table-row-active text-nowrap"
                                                    : "table-row-deactive text-nowrap"
                                                }
                                              >
                                                {item.last_name}
                                              </td>
                                              <td
                                                className={
                                                  item.status
                                                    ? " table-row-active text-nowrap"
                                                    : "table-row-deactive text-nowrap"
                                                }
                                              >
                                                {item.email}
                                              </td>
                                              <td
                                                className={
                                                  item.status
                                                    ? " table-row-active text-nowrap"
                                                    : "table-row-deactive text-nowrap"
                                                }
                                              >
                                                {item.team_name}
                                              </td>
                                              <td
                                                className={
                                                  item.status
                                                    ? " table-row-active text-nowrap"
                                                    : "table-row-deactive text-nowrap"
                                                }
                                              >
                                                <div className="d-flex align-items-center">
                                                  <span className="ms-1">
                                                    b
                                                  </span>
                                                  <div
                                                    className="ms-1"
                                                    style={{
                                                      height: 15,
                                                      width: 15,
                                                      backgroundColor: item
                                                        .responsibility.b
                                                        ? "#2bd144"
                                                        : "red",
                                                    }}
                                                  />
                                                  <span className="ms-1">
                                                    pc
                                                  </span>
                                                  <div
                                                    className="ms-1"
                                                    style={{
                                                      height: 15,
                                                      width: 15,
                                                      backgroundColor: item
                                                        .responsibility.pc
                                                        ? "#2bd144"
                                                        : "red",
                                                    }}
                                                  />
                                                  <span className="ms-1">
                                                    sc
                                                  </span>
                                                  <div
                                                    className="ms-1"
                                                    style={{
                                                      height: 15,
                                                      width: 15,
                                                      backgroundColor: item
                                                        .responsibility.sc
                                                        ? "#2bd144"
                                                        : "red",
                                                    }}
                                                  />
                                                  <span className="ms-1">
                                                    vs
                                                  </span>
                                                  <div
                                                    className="ms-1"
                                                    style={{
                                                      height: 15,
                                                      width: 15,
                                                      backgroundColor: item
                                                        .responsibility.vs
                                                        ? "#2bd144"
                                                        : "red",
                                                    }}
                                                  />
                                                </div>
                                              </td>
                                              <td
                                                className={
                                                  item.status
                                                    ? " table-row-active text-nowrap"
                                                    : "table-row-deactive text-nowrap"
                                                }
                                              >
                                                <Switch
                                                  key={item}
                                                  checked={item.status}
                                                  onColor="#2bd144"
                                                  offColor="#ff0707"
                                                  checkedIcon={false}
                                                  handleDiameter={21}
                                                  height={25}
                                                  uncheckedIcon={false}
                                                  onChange={() => {
                                                    setToggleOn(
                                                      item.status ? false : true
                                                    );
                                                    setActiveItems(item);
                                                    setToggleOnModal(true);
                                                  }}
                                                />
                                              </td>
                                            </tr>
                                          ))}
                                    </tbody>
                                  </table>
                                </div>
                                <div className="d-sm-flex justify-content-between">
                                  {renderActivatedAndDeactivated()}
                                  {(userStatusStaffFilter ||
                                    responsibilityStaffFilter) !== undefined &&
                                    (
                                      userStatusStaffFilter ||
                                      responsibilityStaffFilter
                                    )?.length > 10 && (
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
                                            userStatusStaffFilter?.length ||
                                            responsibilityStaffFilter?.length
                                          }
                                          paginate={paginate}
                                          currentPage={
                                            page?.currentPageForStaffList
                                          }
                                          type="Staff"
                                          setPrevBtn={() =>
                                            setPage({
                                              ...page,
                                              currentPageForStaffList:
                                                page.currentPageForStaffList -
                                                1,
                                            })
                                          }
                                          setNextBtn={() =>
                                            setPage({
                                              ...page,
                                              currentPageForStaffList:
                                                page.currentPageForStaffList +
                                                1,
                                            })
                                          }
                                        />
                                      </div>
                                    )}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )}

                    {eventsType === "player" && (
                      <>
                        {isPlayerFetching ? (
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
                            {playersList.length === 0 ? (
                              <h6 className="my-3 d-flex justify-content-center">
                                No players found
                              </h6>
                            ) : (
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
                                        F Name
                                      </th>
                                      <th
                                        className={
                                          "bg-light border-top border-bottom py-3 ps-2"
                                        }
                                        style={{
                                          fontSize: FONT_SIZE.S,
                                        }}
                                      >
                                        L Name
                                      </th>
                                      <th
                                        className={
                                          "bg-light border-top border-bottom py-3 ps-2"
                                        }
                                        style={{
                                          fontSize: FONT_SIZE.S,
                                        }}
                                      >
                                        Email
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
                                        Jersey #
                                      </th>
                                      <th
                                        className={
                                          "bg-light border-top border-bottom py-3 ps-2"
                                        }
                                        style={{
                                          fontSize: FONT_SIZE.S,
                                        }}
                                      >
                                        Batting
                                      </th>
                                      <th
                                        className={
                                          "bg-light border-top border-bottom py-3 ps-2"
                                        }
                                        style={{
                                          fontSize: FONT_SIZE.S,
                                        }}
                                      >
                                        Throwing
                                      </th>
                                      <th
                                        className={
                                          "bg-light border-top border-bottom py-3 ps-2"
                                        }
                                        style={{
                                          fontSize: FONT_SIZE.S,
                                        }}
                                      >
                                        User Status
                                      </th>
                                      {renderModal()}
                                    </tr>
                                    <tbody>
                                      {playersList
                                        .slice(
                                          indexOfFirstPostForPlayerList,
                                          indexOfLastPostForPlayerList
                                        )
                                        .map((item, index) => (
                                          <tr
                                            key={index}
                                            style={{
                                              fontSize: FONT_SIZE.S,
                                            }}
                                          >
                                            <td
                                              className={
                                                item.status
                                                  ? " table-row-active text-nowrap"
                                                  : "table-row-deactive text-nowrap"
                                              }
                                            >
                                              {(
                                                (page?.currentPageForPlayerList -
                                                  1) *
                                                  10 +
                                                index +
                                                1
                                              )
                                                .toString()
                                                .padStart(2, "0")}
                                            </td>
                                            <td
                                              className={
                                                item.status
                                                  ? " table-row-active text-nowrap"
                                                  : "table-row-deactive text-nowrap"
                                              }
                                            >
                                              {item.first_name}
                                            </td>
                                            <td
                                              className={
                                                item.status
                                                  ? " table-row-active text-nowrap"
                                                  : "table-row-deactive text-nowrap"
                                              }
                                            >
                                              {item.last_name}
                                            </td>
                                            <td
                                              className={
                                                item.status
                                                  ? " table-row-active text-nowrap"
                                                  : "table-row-deactive text-nowrap"
                                              }
                                            >
                                              {item.email}
                                            </td>
                                            <td
                                              className={
                                                item.status
                                                  ? " table-row-active text-nowrap"
                                                  : "table-row-deactive text-nowrap"
                                              }
                                            >
                                              {item.team_name}
                                            </td>
                                            <td
                                              className={
                                                item.status
                                                  ? " table-row-active text-nowrap"
                                                  : "table-row-deactive text-nowrap"
                                              }
                                            >
                                              {item.jersy_no}
                                            </td>
                                            <td
                                              className={
                                                item.status
                                                  ? " table-row-active text-nowrap"
                                                  : "table-row-deactive text-nowrap"
                                              }
                                            >
                                              {item.batting_style}
                                            </td>
                                            <td
                                              className={
                                                item.status
                                                  ? " table-row-active text-nowrap"
                                                  : "table-row-deactive text-nowrap"
                                              }
                                            >
                                              {item.throwing_style}
                                            </td>
                                            <td
                                              className={
                                                item.status
                                                  ? " table-row-active text-nowrap"
                                                  : "table-row-deactive text-nowrap"
                                              }
                                            >
                                              <Switch
                                                key={item}
                                                checked={item.status}
                                                onColor="#2bd144"
                                                offColor="#ff0707"
                                                checkedIcon={false}
                                                handleDiameter={21}
                                                height={25}
                                                uncheckedIcon={false}
                                                onChange={() => {
                                                  setToggleOn(
                                                    item.status ? false : true
                                                  );
                                                  setActiveItems(item);
                                                  setToggleOnModal(true);
                                                }}
                                              />
                                            </td>
                                          </tr>
                                        ))}
                                    </tbody>
                                  </table>
                                </div>
                                <div className="d-sm-flex justify-content-between">
                                  {renderActivatedAndDeactivated()}
                                  {playersList !== undefined &&
                                    playersList?.length > 10 && (
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "flex-end",
                                          marginTop: "10px",
                                        }}
                                      >
                                        <Pagination
                                          itemsPerPage={itemsPerPage}
                                          totalItems={playersList?.length}
                                          paginate={paginate}
                                          currentPage={
                                            page?.currentPageForPlayerList
                                          }
                                          type="Player"
                                          setPrevBtn={() =>
                                            setPage({
                                              ...page,
                                              currentPageForPlayerList:
                                                page.currentPageForPlayerList -
                                                1,
                                            })
                                          }
                                          setNextBtn={() =>
                                            setPage({
                                              ...page,
                                              currentPageForPlayerList:
                                                page.currentPageForPlayerList +
                                                1,
                                            })
                                          }
                                        />
                                      </div>
                                    )}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )}

                    {eventsType === "fan" && (
                      <>
                        {isFanFetching ? (
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
                            {fansList.length === 0 ? (
                              <h6 className="my-3 d-flex justify-content-center">
                                No fans found
                              </h6>
                            ) : (
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
                                        F Name
                                      </th>
                                      <th
                                        className={
                                          "bg-light border-top border-bottom py-3 ps-2"
                                        }
                                        style={{
                                          fontSize: FONT_SIZE.S,
                                        }}
                                      >
                                        L Name
                                      </th>
                                      <th
                                        className={
                                          "bg-light border-top border-bottom py-3 ps-2"
                                        }
                                        style={{
                                          fontSize: FONT_SIZE.S,
                                        }}
                                      >
                                        Email
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
                                        Subscription Status
                                      </th>
                                      <th
                                        className={
                                          "bg-light border-top border-bottom py-3 ps-2"
                                        }
                                        style={{
                                          fontSize: FONT_SIZE.S,
                                        }}
                                      >
                                        User Status
                                      </th>
                                      {renderModal()}
                                    </tr>
                                    <tbody className="">
                                      {fansList
                                        .slice(
                                          indexOfFirstPostForFanList,
                                          indexOfLastPostForFanList
                                        )
                                        .map((item, index) => (
                                          <tr
                                            key={index}
                                            style={{
                                              fontSize: FONT_SIZE.S,
                                            }}
                                          >
                                            <td
                                              className={
                                                item.status
                                                  ? " table-row-active text-nowrap"
                                                  : "table-row-deactive text-nowrap"
                                              }
                                            >
                                              {(
                                                (page?.currentPageForFanList -
                                                  1) *
                                                  10 +
                                                index +
                                                1
                                              )
                                                .toString()
                                                .padStart(2, "0")}
                                            </td>
                                            <td
                                              className={
                                                item.status
                                                  ? " table-row-active text-nowrap"
                                                  : "table-row-deactive text-nowrap"
                                              }
                                            >
                                              {item.first_name}
                                            </td>
                                            <td
                                              className={
                                                item.status
                                                  ? " table-row-active text-nowrap"
                                                  : "table-row-deactive text-nowrap"
                                              }
                                            >
                                              {item.last_name}
                                            </td>
                                            <td
                                              className={
                                                item.status
                                                  ? " table-row-active text-nowrap"
                                                  : "table-row-deactive text-nowrap"
                                              }
                                            >
                                              {item.email}
                                            </td>
                                            <td
                                              className={
                                                item.status
                                                  ? " table-row-active text-nowrap"
                                                  : "table-row-deactive text-nowrap"
                                              }
                                            >
                                              {item.team_name}
                                            </td>
                                            {item.is_subscribe ? (
                                              <td
                                                className={
                                                  item.status
                                                    ? " table-row-active text-nowrap"
                                                    : "table-row-deactive text-nowrap"
                                                }
                                                style={{
                                                  color: "green",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                Active
                                              </td>
                                            ) : (
                                              <td
                                                className={
                                                  item.status
                                                    ? " table-row-active text-nowrap"
                                                    : "table-row-deactive text-nowrap"
                                                }
                                                style={{
                                                  color: "red",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                InActive
                                              </td>
                                            )}
                                            <td
                                              className={
                                                item.status
                                                  ? " table-row-active text-nowrap"
                                                  : "table-row-deactive text-nowrap"
                                              }
                                            >
                                              <Switch
                                                key={item}
                                                checked={item.status}
                                                onColor="#2bd144"
                                                offColor="#ff0707"
                                                checkedIcon={false}
                                                handleDiameter={21}
                                                height={25}
                                                uncheckedIcon={false}
                                                onChange={() => {
                                                  setToggleOn(
                                                    item.status ? false : true
                                                  );
                                                  setActiveItems(item);
                                                  setToggleOnModal(true);
                                                }}
                                              />
                                            </td>
                                          </tr>
                                        ))}
                                    </tbody>
                                  </table>
                                </div>
                                <div className="d-sm-flex justify-content-between">
                                  {renderActivatedAndDeactivated()}
                                  {fansList !== undefined &&
                                    fansList?.length > 10 && (
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "flex-end",
                                          marginTop: "10px",
                                        }}
                                      >
                                        <Pagination
                                          itemsPerPage={itemsPerPage}
                                          totalItems={fansList?.length}
                                          paginate={paginate}
                                          currentPage={
                                            page?.currentPageForFanList
                                          }
                                          type="Fan"
                                          setPrevBtn={() =>
                                            setPage({
                                              ...page,
                                              currentPageForFanList:
                                                page.currentPageForFanList - 1,
                                            })
                                          }
                                          setNextBtn={() =>
                                            setPage({
                                              ...page,
                                              currentPageForFanList:
                                                page.currentPageForFanList + 1,
                                            })
                                          }
                                        />
                                      </div>
                                    )}
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

export default UserListScreen;
