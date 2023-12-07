import { createApi } from "@reduxjs/toolkit/query/react";
import { GET_TEAMS_LIST } from "../../utils/URL";
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
  }),
});
export const { useLazyGetTeamsListQuery } = teamsListService;
