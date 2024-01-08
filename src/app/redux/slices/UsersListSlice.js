import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coachesList: localStorage.getItem("coachesList")
    ? JSON.parse(localStorage.getItem("coachesList"))
    : [],
  staffsList: localStorage.getItem("staffsList")
    ? JSON.parse(localStorage.getItem("staffsList"))
    : [],
  playersList: localStorage.getItem("playersList")
    ? JSON.parse(localStorage.getItem("playersList"))
    : [],
  fansList: localStorage.getItem("fansList")
    ? JSON.parse(localStorage.getItem("fansList"))
    : [],
  teamResponsibility: localStorage.getItem("teamResponsibility")
    ? JSON.parse(localStorage.getItem("teamResponsibility"))
    : [],
};

export const usersListSlice = createSlice({
  initialState,
  name: "usersListSlice",
  reducers: {
    getCoachesListDispatch: (state, action) => {
      localStorage.setItem("coachesList", JSON.stringify(action.payload));
      state.coachesList = action.payload;
    },
    getStaffsListDispatch: (state, action) => {
      localStorage.setItem("staffsList", JSON.stringify(action.payload));
      state.staffsList = action.payload;
    },
    getPlayersListDispatch: (state, action) => {
      localStorage.setItem("playersList", JSON.stringify(action.payload));
      state.playersList = action.payload;
    },
    getFansListDispatch: (state, action) => {
      localStorage.setItem("fansList", JSON.stringify(action.payload));
      state.fansList = action.payload;
    },
    teamResponsibilityDispatch: (state, action) => {
      localStorage.setItem(
        "teamResponsibility",
        JSON.stringify(action.payload)
      );
      state.teamResponsibility = action.payload;
    },
  },
});

export default usersListSlice.reducer;

export const {
  getCoachesListDispatch,
  getStaffsListDispatch,
  getPlayersListDispatch,
  getFansListDispatch,
  teamResponsibilityDispatch,
} = usersListSlice.actions;
