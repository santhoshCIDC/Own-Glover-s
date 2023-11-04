import { HTTPClient } from "../../../app/utils/HttpsClient";
import { GET_SETTINGS } from "../../utils/URL";

export const settingsService = HTTPClient.injectEndpoints({
  endpoints: (build) => ({
    getSettings: build.query({
      query: () => ({
        url: GET_SETTINGS,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetSettingsQuery } = settingsService;
