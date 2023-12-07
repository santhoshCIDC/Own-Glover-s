import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import MainRoutes from "./app/routes/MainRoutes";
import { Provider } from "react-redux";
import { store } from "./app/redux/store";

function App() {

  return (
    <div className="App">
      <Provider store={store}>
          <MainRoutes />
      </Provider>
    </div>
  );
}

export default App;
