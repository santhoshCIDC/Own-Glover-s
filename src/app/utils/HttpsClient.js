import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./URL";
import { store } from "../redux/store";
import { isLogout } from "../redux/slices/AuthSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json");
    const token = getState().auth.tokenDetails;
    // if token is available, include the token to the headers
    if (token?.access_token) {
      headers.set("Authorization", `${token?.access_token}`);
    }
    return headers;
  },
});

const baseQueryWithInterceptor = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log("API <----> Result", result);
  if (result.error && result.error.status === 401) {
    store.dispatch(isLogout(null));
  }
  return result;
};

export const HTTPClient = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});
