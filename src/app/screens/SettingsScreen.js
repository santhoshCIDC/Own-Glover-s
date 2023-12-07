import React, { useEffect, useState } from "react";
import { useLazyGetSettingsQuery } from "../redux/services/SettingsService";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { getSettingsDispatch } from "../redux/slices/SettingsSlice";

const SettingScreen = () => {
  const dispatch = useDispatch();
  const [getSettings, { data, isLoading }] = useLazyGetSettingsQuery();
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
  }, [getSettings]);

  useEffect(() => {
    if (!isLoading && data?.code === 0) {
      dispatch(getSettingsDispatch(data?.data));
    }
  }, [data?.code, isLoading]);

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
                  <button className="btn btn-success px-3 py-1">
                    <h6 className="mb-0 fw-bold">Submit</h6>
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
                  <button className="btn btn-success px-3 py-1">
                    <h6 className="mb-0 fw-bold">Submit</h6>
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
      </div>
    </div>
  );
};

export default SettingScreen;
