import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teamsList: localStorage.getItem("teamsList")
    ? JSON.parse(localStorage.getItem("teamsList"))
    : [],
  seasonList: localStorage.getItem("seasonList")
    ? JSON.parse(localStorage.getItem("seasonList"))
    : [],
  eventsList: localStorage.getItem("eventsList")
    ? JSON.parse(localStorage.getItem("eventsList"))
    : [],
};

export const teamsListSlice = createSlice({
  initialState,
  name: "teamsListSlice",
  reducers: {
    getTeamsListDispatch: (state, action) => {
      localStorage.setItem("teamsList", JSON.stringify(action.payload));
      state.teamsList = action.payload;
    },
    getSeasonsListDispatch: (state, action) => {
      localStorage.setItem("seasonList", JSON.stringify(action.payload));
      state.seasonList = action.payload;
    },
    getEventsListDispatch: (state, action) => {
      localStorage.setItem("eventsList", JSON.stringify(action.payload));
      state.eventsList = action.payload;
    },
  },
});

export default teamsListSlice.reducer;

export const {
  getTeamsListDispatch,
  getSeasonsListDispatch,
  getEventsListDispatch,
} = teamsListSlice.actions;
