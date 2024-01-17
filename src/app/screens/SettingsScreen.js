import React, { useEffect, useState } from "react";
import {
  useEventsSettingsMutation,
  useLazyGetSettingsQuery,
} from "../redux/services/SettingsService";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { getSettingsDispatch } from "../redux/slices/SettingsSlice";
import CircleLoading from "../components/CircleLoading";
import Utility, { ToastMessage } from "../utils/Utility";

const SettingScreen = () => {
  const dispatch = useDispatch();
  const [getSettings, { data, isLoading }] = useLazyGetSettingsQuery();
  const [submit, setSubmit] = useState("");
  const [eventsSettings, { data: eventsSettingsData }] =
    useEventsSettingsMutation();
  //global State
  const settingsDetails = useSelector(
    (state) => state.settingsDetailsState.settingsDetails
  );

  //Local State
  const [noofPlayers, setNoofPlayers] = useState(
    settingsDetails?.total_no_players_home_team
  );
  const [noofStaffs, setNoofStaffs] = useState(
    settingsDetails?.no_of_staffs_coaches_home_team
  );

  useEffect(() => {
    getSettings({});
    if (eventsSettingsData?.code === 0) {
      Utility.toastMessage("Updated");
    }
  }, [getSettings, eventsSettingsData]);

  useEffect(() => {
    if (!isLoading && data?.code === 0) {
      dispatch(getSettingsDispatch(data?.data));
    }
  }, [data?.code, isLoading]);

  const onClickPlayerSubmitButton = async () => {
    setSubmit("Submit1");
    let eventsSettingsReq = {
      type: "home_team",
      value: noofPlayers,
    };
    await eventsSettings(eventsSettingsReq);
    setSubmit("");
  };

  const onClickStaffSubmitButton = async () => {
    setSubmit("Submit2");
    let eventsSettingsReq = {
      type: "staff_home_team",
      value: noofStaffs,
    };
    await eventsSettings(eventsSettingsReq);
    setSubmit("");
  };

  //initial render
  return (
    <div className="container-fluid h-100 p-0">
      <Header />
      <div className="container-fluid py-3 border-top">
        <div className="row">
          <div className="col">
            <h5 className="mb-0 ms-3">Settings</h5>
          </div>
        </div>
      </div>
      <div className=" ms-3 me-3 border">
        <button
          className="btn w-10 mt-4 mb-3"
          style={{ marginRight: "1vw", border: "none", cursor: "default" }}
        >
          <h6 className=" fw-bold active-text-color text-nowrap">
            Event Creation
          </h6>
        </button>
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
          <div className="table-responsive">
            <table className="mb-0">
              <thead>
                <tr>
                  <th
                    className="settings_th py-3"
                    style={{ width: "350px" }}
                    scope="col"
                  >
                    Type
                  </th>
                  <th
                    className="settings_th"
                    scope="col"
                    style={{ width: "100px" }}
                  >
                    Value
                  </th>
                  <th className="settings_th" scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="settings_th">Number of Players for team</td>
                  <td className="settings_th">
                    <input
                      className="my-4 border-1"
                      type="number"
                      min={"1"}
                      max={"9"}
                      style={{ width: 25, paddingLeft: 2 }}
                      value={noofPlayers}
                      onChange={(text) => setNoofPlayers(text.target.value)}
                    />
                  </td>
                  <td className="settings_th">
                    <button
                      className="btn btn-success px-3 py-1"
                      onClick={() => onClickPlayerSubmitButton()}
                    >
                      <h6 className="mb-0 fw-bold">
                        {submit === "Submit1" ? "Please wait" : "Submit"}
                      </h6>
                    </button>
                  </td>
                  <td className="px-3">
                    <button
                      className="btn btn-danger align-items-center d-flex flex-column"
                      style={{ height: 30, width: 30 }}
                      onClick={() => setNoofPlayers("")}
                    >
                      <h6 className="mb-0 fw-bold">X</h6>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="settings_th">
                    Number of Staff + Coaches for team
                  </td>
                  <td className="settings_th">
                    <input
                      className="my-3 border-1"
                      type="number"
                      min={"1"}
                      max={"2"}
                      style={{ width: 25, paddingLeft: 2 }}
                      value={noofStaffs}
                      onChange={(text) => setNoofStaffs(text.target.value)}
                    />
                  </td>
                  <td className="settings_th">
                    <button
                      className="btn btn-success px-3 py-1"
                      onClick={() => onClickStaffSubmitButton()}
                    >
                      <h6 className="mb-0 fw-bold">
                        {submit === "Submit2" ? "Please wait" : "Submit"}
                      </h6>
                    </button>
                  </td>
                  <td className="px-3">
                    <button
                      className="btn btn-danger align-items-center d-flex flex-column"
                      style={{ height: 30, width: 30 }}
                      onClick={() => setNoofStaffs("")}
                    >
                      <h6 className="mb-0 fw-bold">X</h6>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
      {ToastMessage()}
    </div>
  );
};

export default SettingScreen;
