import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import ProtectedRoute from "./ProtectedRoute";
import DashboardScreen from "../screens/DashboardScreen";
import UserListScreen from "../screens/UserListScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SeasonsScreen from "../screens/SeasonsScreen";

import { useAppSelector } from "../redux/store";

const MainRoutes = () => {
  const tokenDetails = useAppSelector((state) => state.auth.tokenDetails);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LoginScreen />} />
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
          path="/settings"
          element={
            <ProtectedRoute auth={tokenDetails}>
              <SettingsScreen />
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
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
