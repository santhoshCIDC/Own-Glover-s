import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import ProtectedRoute from "./ProtectedRoute";
import DashboardScreen from "../screens/DashboardScreen";
import UserListScreen from "../screens/UserListScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SeasonsScreen from "../screens/SeasonsScreen";

const MainRoutes = () => {
  const [login, setLogin] = useState(
    localStorage.getItem("loginData")
      ? localStorage.getItem("loginData")
      : false
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LoginScreen setLogin={setLogin} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute auth={login}>
              <DashboardScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userList"
          element={
            <ProtectedRoute auth={login}>
              <UserListScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute auth={login}>
              <SettingsScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seasons"
          element={
            <ProtectedRoute auth={login}>
              <SeasonsScreen />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
