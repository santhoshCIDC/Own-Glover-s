import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import MainRoutes from "./app/routes/MainRoutes";

function App() {
  return (
    <div className="App min-vh-100 vh-100">
      <MainRoutes />
    </div>
  );
}

export default App;
