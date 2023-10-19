import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SplashScreen from "./app/screens/SplashScreen";
import LoginScreen from "./app/screens/LoginScreen";
import HomeScreen from "./app/screens/HomeScreen";
import { useState } from "react";

function App() {
  const [login, setLogin] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<LoginScreen setLogin={setLogin} />} />
          <Route path="/home" element={<HomeScreen Islogin={login} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
