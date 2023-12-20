import { createApi } from "@reduxjs/toolkit/query/react";
import {
  GET_EVENT_LIST,
  GET_SEASON_LIST,
  GET_TEAMS_LIST,
} from "../../utils/URL";
import HttpsClient from "../../utils/HttpsClient";

export const teamsListService = createApi({
  reducerPath: "teamsListService",
  baseQuery: HttpsClient,
  endpoints: (builder) => ({
    getTeamsList: builder.query({
      query: () => ({
        url: GET_TEAMS_LIST,
        method: "GET",
      }),
    }),
    getSeasonList: builder.query({
      query: () => ({
        url: GET_SEASON_LIST,
        method: "GET",
      }),
    }),
    getEventsList: builder.query({
      query: (params) => ({
        url: GET_EVENT_LIST,
        method: "GET",
        params: params,
      }),
    }),
  }),
});
export const {
  useLazyGetTeamsListQuery,
  useLazyGetSeasonListQuery,
  useLazyGetEventsListQuery,
} = teamsListService;
