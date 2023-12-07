import { createApi } from "@reduxjs/toolkit/dist/query/react";
import HttpsClient from "../../utils/HttpsClient";
import { GET_SETTINGS } from "../../utils/URL";

export const settingsService = createApi({
  reducerPath: "settingsService",
  baseQuery: HttpsClient,
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => ({
        url: GET_SETTINGS,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetSettingsQuery } = settingsService;
