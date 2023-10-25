import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

import SplashScreen from "./app/screens/SplashScreen";
import LoginScreen from "./app/screens/LoginScreen";
import DashboardScreen from "./app/screens/DashboardScreen";

function App() {
  const [login, setLogin] = useState(false);
  return (
    <div className="App min-vh-100 vh-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<LoginScreen setLogin={setLogin} />} />
          <Route
            path="/dashboard"
            element={<DashboardScreen Islogin={login} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
