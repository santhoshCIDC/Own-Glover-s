import { FONT_SIZE } from "../utils/constants";

export function loader() {
  return (
    <div className="coulmn d-flex ">
      <h5 style={{ fontSize: FONT_SIZE.S, display: "contents" }}>
        Please wait...
        <img
          alt=""
          src={require("../assets/baseballGifs.gif")}
          style={{ height: 20 }}
        />
      </h5>
    </div>
  );
}
