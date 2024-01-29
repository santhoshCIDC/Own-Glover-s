import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
// services
import { authService } from "./services/AuthService";
import { settingsService } from "./services/SettingsService";
import { teamsListService } from "./services/TeamsListService";
import { usersListService } from "./services/UsersListService";
import { dashboardService } from "./services/DashboardService";
// slices
import userReducer from "../redux/slices/AuthSlice";
import settingsDetailsReducer from "../redux/slices/SettingsSlice";
import teamsListReducer from "../redux/slices/TeamsListSlice";
import usersListReducer from "../redux/slices/UsersListSlice";
import dashboardReducer from "../redux/slices/DashboardSlice";

export const store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [dashboardService.reducerPath]: dashboardService.reducer,
    [settingsService.reducerPath]: settingsService.reducer,
    [teamsListService.reducerPath]: teamsListService.reducer,
    [usersListService.reducerPath]: usersListService.reducer,
    userState: userReducer,
    userTokenDetails: userReducer,
    dashboardEventsTabState: dashboardReducer,
    dashboardUserMatricsState: dashboardReducer,
    dashboardUserMatricsWithParamsState: dashboardReducer,
    dashboardEventMatricsState: dashboardReducer,
    dashboardTeamMatricsState: dashboardReducer,
    dashboardRoleMatricsState: dashboardReducer,
    globalSearchState: dashboardReducer,
    settingsDetailsState: settingsDetailsReducer,
    teamsListState: teamsListReducer,
    usersListState: usersListReducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authService.middleware,
      dashboardService.middleware,
      settingsService.middleware,
      teamsListService.middleware,
      usersListService.middleware,
    ]),
});

export var RootState = store.getState;
export var AppDispatch = store.dispatch;
export var useAppDispatch = useDispatch;
export var useAppSelector = useSelector;
