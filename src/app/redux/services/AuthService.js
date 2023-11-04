import { HTTPClient } from "../../../app/utils/HttpsClient";
import { LOGIN } from "../../utils/URL";

export const authService = HTTPClient.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (loginReq) => ({
        url: LOGIN,
        method: "POST",
        body: loginReq,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useLoginMutation } = authService;
