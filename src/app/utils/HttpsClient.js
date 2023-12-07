import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { isLogout } from "../redux/slices/AuthSlice";
import { BASE_URL, LOGIN, REFRESH_TOKEN } from "./URL";

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const { tokenDetails } = getState()?.userTokenDetails;
    if (tokenDetails?.access_token) {
      headers.set("Authorization", `${tokenDetails?.access_token}`);
    }
    return headers;
  },
});

const HttpsClient = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);
  console.log("API-------Result", result);
  if (result.error?.data?.message === "You are not logged in") {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          { url: REFRESH_TOKEN },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          // Retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(isLogout());
          window.location.href = LOGIN;
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export default HttpsClient;
