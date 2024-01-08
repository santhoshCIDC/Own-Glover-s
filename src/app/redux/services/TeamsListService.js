import { createApi } from "@reduxjs/toolkit/query/react";
import {
  DELETE_SEASON,
  GET_EVENT_LIST,
  GET_SEASON_LIST,
  GET_TEAMS_LIST,
  SEASON_CREATE,
} from "../../utils/URL";
import HttpsClient from "../../utils/HttpsClient";

export const teamsListService = createApi({
  reducerPath: "teamsListService",
  baseQuery: HttpsClient,
  endpoints: (builder) => ({
    getTeamsList: builder.query({
      query: (params) => ({
        url: GET_TEAMS_LIST,
        method: "GET",
        params: params,
      }),
    }),
    getSeasonList: builder.query({
      query: () => ({
        url: GET_SEASON_LIST,
        method: "GET",
      }),
    }),
    deleteSeason: builder.mutation({
      query: (req) => ({
        url: DELETE_SEASON,
        method: "PUT",
        body: req,
      }),
    }),
    getEventsList: builder.query({
      query: (params) => ({
        url: GET_EVENT_LIST,
        method: "GET",
        params: params,
      }),
    }),
    seasonCreate: builder.mutation({
      query: (req) => ({
        url: SEASON_CREATE,
        method: "POST",
        body: req,
      }),
    }),
  }),
});
export const {
  useLazyGetTeamsListQuery,
  useLazyGetSeasonListQuery,
  useLazyGetEventsListQuery,
  useDeleteSeasonMutation,
  useSeasonCreateMutation,
} = teamsListService;
