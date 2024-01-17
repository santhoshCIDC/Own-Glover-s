import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dashboardEventsTab: !localStorage.getItem("dashboardEventsTab")
    ? JSON.parse(localStorage.getItem("dashboardEventsTab"))
    : null,
  dashboardUserMatrics: !localStorage.getItem("dashboardUserMatrics")
    ? JSON.parse(localStorage.getItem("dashboardUserMatrics"))
    : null,
  dashboardEventMatrics: !localStorage.getItem("dashboardEventMatrics")
    ? localStorage.getItem("dashboardEventMatrics")
    : null,
  dashboardTeamMatrics: !localStorage.getItem("dashboardTeamMatrics")
    ? localStorage.getItem("dashboardTeamMatrics")
    : null,
};

export const dashboardSlice = createSlice({
  initialState,
  name: "dashboard",
  reducers: {
    getDashboardEventsTabDispatch: (state, action) => {
      localStorage.setItem(
        "dashboardEventsTab",
        JSON.stringify(action.payload)
      );
      state.dashboardEventsTab = action.payload;
    },
    getDashboardUserMatricsDispatch: (state, action) => {
      localStorage.setItem(
        "dashboardUserMatrics",
        JSON.stringify(action.payload)
      );
      state.dashboardUserMatrics = action.payload;
    },
    getDashboardEventMatricsDispatch: (state, action) => {
      localStorage.setItem(
        "dashboardEventMatrics",
        JSON.stringify(action.payload)
      );
      state.dashboardEventMatrics = action.payload;
    },
    getDashboardTeamMatricsDispatch: (state, action) => {
      localStorage.setItem(
        "dashboardTeamMatrics",
        JSON.stringify(action.payload)
      );
      state.dashboardTeamMatrics = action.payload;
    },
  },
});

export default dashboardSlice.reducer;

export const {
  getDashboardEventsTabDispatch,
  getDashboardUserMatricsDispatch,
  getDashboardEventMatricsDispatch,
  getDashboardTeamMatricsDispatch,
} = dashboardSlice.actions;
