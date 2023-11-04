import { createSlice } from "@reduxjs/toolkit";
import Utility from "../../utils/Utility";
import { ToastMessage } from "../../../app/utils/Utility";
import { settingsService } from "../services/SettingsService";

const initialState = {
  settingsDetails: null,
};

export const SettingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      settingsService.endpoints.getSettings.matchFulfilled,
      (state, { payload }) => {
        if (payload.code === 0) {
          console.log("Settings---->2", payload);
          state.settingsDetails = payload.data;
        } else {
          Utility.toastMessage(payload.message);
          return { ToastMessage };
        }
      }
    );
  },
});

export const {} = SettingsSlice.actions;

export default SettingsSlice.reducer;