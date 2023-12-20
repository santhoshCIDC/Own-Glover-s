import { createApi } from "@reduxjs/toolkit/query/react";
import {
  CHANGE_PASSWORD,
  EDIT_PROFILE,
  FORGOT_PASSWORD,
  LOGIN,
  REFRESH_TOKEN,
} from "../../utils/URL";
import HttpsClient from "../../utils/HttpsClient";
import { logout, setUserDetails } from "../slices/AuthSlice";

export const authService = createApi({
  reducerPath: "authService",
  baseQuery: HttpsClient,
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => ({
        url: LOGIN,
        method: "POST",
        body,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserDetails(data.data));
        } catch (error) {}
      },
    }),
    refreshToken: builder.mutation({
      query: (body) => ({
        url: REFRESH_TOKEN,
        method: "POST",
        body,
      }),
    }),
    // logoutUser: builder.mutation({
    //   query: (body) => ({
    //     url: "auth/logout",
    //     method: "POST",
    //     body,
    //   }),
    //   onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
    //     try {
    //       await queryFulfilled;
    //       dispatch(logout());
    //     } catch (error) {}
    //   },
    // }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: FORGOT_PASSWORD,
        method: "POST",
        body,
      }),
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: CHANGE_PASSWORD,
        method: "POST",
        body,
      }),
    }),
    editProfile: builder.mutation({
      query: (body) => ({
        url: EDIT_PROFILE,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useForgotPasswordMutation,
  useChangePasswordMutation,
  useEditProfileMutation,
  useRefreshTokenMutation,
} = authService;
