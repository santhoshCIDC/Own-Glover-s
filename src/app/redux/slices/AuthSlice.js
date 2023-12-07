import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  tokenDetails: localStorage.getItem("tokenDetails")
    ? JSON.parse(localStorage.getItem("tokenDetails"))
    : null,
};

export const authSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    isLogout: (state, action) => {
      localStorage.removeItem("tokenDetails");
      return {  tokenDetails: null };
    },
    setUserDetails: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload?.user));
      localStorage.setItem(
        "tokenDetails",
        JSON.stringify(action.payload?.token_details)
      );
      state.user = action.payload?.user;
      state.tokenDetails = action.payload?.token_details;
    },
    editProfileDispatch: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
  },
});

export default authSlice.reducer;

export const { isLogout, setUserDetails, editProfileDispatch } =
  authSlice.actions;
export const currentUser = (state) => state.userState.user;
