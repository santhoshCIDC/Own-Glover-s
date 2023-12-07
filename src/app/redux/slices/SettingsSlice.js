import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  settingsDetails: localStorage.getItem("settings")
    ? JSON.parse(localStorage.getItem("settings"))
    : null,
};

export const settingsSlice = createSlice({
  initialState,
  name: "settings",
  reducers: {
    getSettingsDispatch: (state, action) => {
      localStorage.setItem("settings", JSON.stringify(action.payload));
      state.settingsDetails = action.payload;
    },
  },
});

export default settingsSlice.reducer;

export const { getSettingsDispatch } = settingsSlice.actions;
