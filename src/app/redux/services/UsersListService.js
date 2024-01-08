import { createApi } from "@reduxjs/toolkit/query/react";
import HttpsClient from "../../utils/HttpsClient";
import {
  GET_COACH_LIST,
  GET_FAN_LIST,
  GET_PLAYER_LIST,
  GET_STAFF_LIST,
  TEAM_RESPONSIBILITY_LIST,
} from "../../utils/URL";

export const usersListService = createApi({
  reducerPath: "usersListService",
  baseQuery: HttpsClient,
  endpoints: (builder) => ({
    getCoachesList: builder.query({
      query: (params) => ({
        url: GET_COACH_LIST,
        method: "GET",
        params: params,
      }),
    }),
    getStaffsList: builder.query({
      query: (params) => ({
        url: GET_STAFF_LIST,
        method: "GET",
        params: params,
      }),
    }),
    getPlayersList: builder.query({
      query: (params) => ({
        url: GET_PLAYER_LIST,
        method: "GET",
        params: params,
      }),
    }),
    getFansList: builder.query({
      query: (params) => ({
        url: GET_FAN_LIST,
        method: "GET",
        params: params,
      }),
    }),
    teamResponsibility: builder.mutation({
      query: (req) => ({
        url: TEAM_RESPONSIBILITY_LIST,
        method: "POST",
        body: req,
      }),
    }),
  }),
});
export const {
  useLazyGetCoachesListQuery,
  useLazyGetStaffsListQuery,
  useLazyGetPlayersListQuery,
  useLazyGetFansListQuery,
  useTeamResponsibilityMutation,
} = usersListService;
