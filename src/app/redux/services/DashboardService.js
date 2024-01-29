import { createApi } from "@reduxjs/toolkit/dist/query/react";
import HttpsClient from "../../utils/HttpsClient";
import {
  DASHBOARD_EVENTS_TABS,
  DASHBOARD_EVENT_MATRICS,
  DASHBOARD_ROLE_MATRICS,
  DASHBOARD_TEAM_MATRICS,
  DASHBOARD_USER_MATRICS,
  GLOBAL_SEARCH,
} from "../../utils/URL";

export const dashboardService = createApi({
  reducerPath: "dashboardService",
  baseQuery: HttpsClient,
  endpoints: (builder) => ({
    getEventsTab: builder.query({
      query: () => ({
        url: DASHBOARD_EVENTS_TABS,
        method: "GET",
      }),
    }),
    getUserMatrics: builder.query({
      query: () => ({
        url: DASHBOARD_USER_MATRICS,
        method: "GET",
      }),
    }),
    getUserMatricsWithParams: builder.query({
      query: (params) => ({
        url: DASHBOARD_USER_MATRICS,
        method: "GET",
        params: params,
      }),
    }),
    getEventMatrics: builder.query({
      query: () => ({
        url: DASHBOARD_EVENT_MATRICS,
        method: "GET",
      }),
    }),
    getTeamMatrics: builder.query({
      query: () => ({
        url: DASHBOARD_TEAM_MATRICS,
        method: "GET",
      }),
    }),
    getRoleMatrics: builder.query({
      query: () => ({
        url: DASHBOARD_ROLE_MATRICS,
        method: "GET",
      }),
    }),
    globalSearch: builder.mutation({
      query: (body) => ({
        url: GLOBAL_SEARCH,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLazyGetEventsTabQuery,
  useLazyGetUserMatricsQuery,
  useLazyGetEventMatricsQuery,
  useLazyGetTeamMatricsQuery,
  useLazyGetUserMatricsWithParamsQuery,
  useLazyGetRoleMatricsQuery,
  useGlobalSearchMutation,
} = dashboardService;
