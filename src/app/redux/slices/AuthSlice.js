import { createSlice } from "@reduxjs/toolkit";
import { authService } from "../services/AuthService";
import Utility from "../../utils/Utility";
import { ToastMessage } from "../../../app/utils/Utility";

const initialState = {
  tokenDetails: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isLogout: (state, action) => {
      state.tokenDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authService.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        if (payload.code === 0) {
          state.tokenDetails = payload.data.token_details;
        } else {
          Utility.toastMessage(payload.message);
          return { ToastMessage };
        }
      }
    );
  },
});

export const { isLogout } = authSlice.actions;

export default authSlice.reducer;
