import { createApi } from "@reduxjs/toolkit/dist/query/react";
import HttpsClient from "../../utils/HttpsClient";
import { EVENT_SETTINGS, GET_EVENT_SETTINGS } from "../../utils/URL";

export const settingsService = createApi({
  reducerPath: "settingsService",
  baseQuery: HttpsClient,
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => ({
        url: GET_EVENT_SETTINGS,
        method: "GET",
      }),
    }),
    eventsSettings: builder.mutation({
      query: (body) => ({
        url: EVENT_SETTINGS,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLazyGetSettingsQuery, useEventsSettingsMutation } =
  settingsService;
