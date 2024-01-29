import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import ProtectedRoute from "./ProtectedRoute";
import DashboardScreen from "../screens/DashboardScreen";
import UserListScreen from "../screens/UserListScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SeasonsScreen from "../screens/SeasonsScreen";
import ChangePassword from "../screens/ChangePassword";
import EventsList from "../screens/EventsList";
import TeamsList from "../screens/TeamsList";
import EditProfileScreen from "../screens/EditProfileScreen";
import ForgotPassword from "../screens/ForgotPassword";

const MainRoutes = () => {
  const tokenDetails = useSelector(
    (state) => state.userTokenDetails?.tokenDetails?.access_token
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute auth={tokenDetails}>
              <DashboardScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userList"
          element={
            <ProtectedRoute auth={tokenDetails}>
              <UserListScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teamsList"
          element={
            <ProtectedRoute auth={tokenDetails}>
              <TeamsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/eventsList"
          element={
            <ProtectedRoute auth={tokenDetails}>
              <EventsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seasons"
          element={
            <ProtectedRoute auth={tokenDetails}>
              <SeasonsScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute auth={tokenDetails}>
              <SettingsScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/changePassword"
          element={
            <ProtectedRoute auth={tokenDetails}>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editProfile"
          element={
            <ProtectedRoute auth={tokenDetails}>
              <EditProfileScreen />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
