import { useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { FONT_SIZE } from "../utils/constants";
import { IMAGES } from "../utils/SharedImages";
import Tooltip from "./Tooltip";

const capitalize = (word) => {
  return word[0].toUpperCase() + word.slice(1);
};
const TableContainer = ({
  data,
  withBorder = true,
  seasonsList = false,
  inputValue,
  onChange,
}) => {
  const [users, setUsers] = useState(data);

  const renderSeasonsList = () => {
    return users.map(({ SNo, seasons, update, Delete }) => {
      return (
        <tr
          className="container-fluid border-bottom"
          key={SNo}
          style={{
            fontSize: FONT_SIZE.S,
          }}
        >
          <td className="ps-2">{SNo}</td>
          <td className="ps-2">{seasons}</td>
          <td className="ps-2">
            <img
              style={{ height: 15, width: 15, cursor: "pointer" }}
              src={IMAGES.pencil_Icon}
              alt="pencil"
              data-tooltip-id="edit-tooltip"
            />
            <Tooltip id={"edit-tooltip"} content="Edit" />
          </td>
          <td className="ps-2">
            <img
              style={{ height: 20, width: 20, cursor: "pointer" }}
              src={IMAGES.delete_Icon}
              alt="delete"
              data-tooltip-id="delete-tooltip"
            />
            <Tooltip id={"delete-tooltip"} content="Delete" />
          </td>
        </tr>
      );
    });
  };

  const renderHeader = () => {
    return (
      <tr>
        {Object.keys(data[0]).map((key) => (
          <th
            className={
             
                "bg-light border-top border-bottom py-2 ps-2"
               
            }
            style={{
              fontSize: FONT_SIZE.S,
            }}
          >
            {capitalize(key)}
          </th>
        ))}
      </tr>
    );
  };

  return (
    <div className="row mt-3">
      <div class="table-responsive">
        <table className={"table"}>
          {renderHeader()}
          <tbody>{renderSeasonsList()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default TableContainer;
