import { useState } from "react";
import { FONT_SIZE } from "../utils/constants";
import { IMAGES } from "../utils/SharedImages";
import Tooltip from "./Tooltip";
import RenderModal from "./RenderModal";

const capitalize = (word) => {
  return word[0].toUpperCase() + word.slice(1);
};
const TableContainer = ({ data }) => {
  const [editShowModal, setEditShowModal] = useState(false);
  const [deleteShowModal, setDeleteShowModal] = useState(false);
  const [seasonName, setSeasonName] = useState("");

  const renderSeasonsList = () => {
    return data.map((item, index) => (
      <tr
        key={index}
        style={{
          fontSize: FONT_SIZE.S,
        }}
      >
        {Object.keys(item).map((key) => (
          <td
            className={`ps-2 ${
              key === "Progress" || key === "Result"
                ? "text_primary"
                : "text_secondary"
            }`}
          >
            {item[key]}
            {key === "update" ? (
              <img
                onClick={() => {
                  setEditShowModal(true);
                  setSeasonName(item.seasons);
                }}
                style={{ height: 15, width: 15, cursor: "pointer" }}
                src={IMAGES.pencil_Icon}
                alt="pencil"
                data-tooltip-id="edit-tooltip"
              />
            ) : key === "delete" ? (
              <img
                onClick={() => {
                  setDeleteShowModal(true);
                  setSeasonName(item.seasons);
                }}
                style={{ height: 20, width: 20, cursor: "pointer" }}
                src={IMAGES.delete_Icon}
                alt="delete"
                data-tooltip-id="delete-tooltip"
              />
            ) : null}
          </td>
        ))}
        <Tooltip id={"edit-tooltip"} content="Edit" />
        <Tooltip id={"delete-tooltip"} content="Delete" />
      </tr>
    ));
  };

  const renderHeader = () => {
    return (
      <tr>
        {Object.keys(data[0]).map((key) => (
          <th
            className={"bg-light border-top border-bottom py-2 ps-2"}
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
      <RenderModal
        show={editShowModal}
        onHide={() => setEditShowModal(false)}
        closeBtnOnClick={() => setEditShowModal(false)}
        modaltitle={"Season Name:"}
        modalbody={
          <div>
            <input
              className="border border-success-subtle border-1 p-1 ps-2"
              placeholder="Season Name"
              style={{ fontSize: FONT_SIZE.S, borderRadius: 3 }}
              value={seasonName}
              onChange={(text) => setSeasonName(text.target.value)}
            />
            <h6 className="date-text pt-3">Start Date:</h6>
            <input
              type="date"
              className="border border-success-subtle border-1 p-1 ps-2"
              placeholder="dd/mm/yyyy"
              style={{
                fontSize: FONT_SIZE.S,
                borderRadius: 3,
                width: "100%",
              }}
            />
            <h6 className="date-text pt-3">End Date:</h6>
            <input
              type="date"
              className="border border-success-subtle border-1 p-1 ps-2"
              placeholder="dd/mm/yyyy"
              style={{
                fontSize: FONT_SIZE.S,
                borderRadius: 3,
                width: "100%",
              }}
            />
          </div>
        }
        OkText={"Submit"}
        fieldsActive={true}
        okOnClick={() => {}}
      />
      <RenderModal
        show={deleteShowModal}
        onHide={() => setDeleteShowModal(false)}
        closeBtnOnClick={() => setDeleteShowModal(false)}
        modalbody={`Are you sure you want to delete the ${seasonName}?`}
        OkText={"Delete"}
        CancelText={"Cancel"}
        logoutModal={true}
        okOnClick={() => {}}
      />
    </div>
  );
};

export default TableContainer;
