import { useState } from "react";
import { FONT_SIZE } from "../utils/constants";
import { IMAGES } from "../utils/SharedImages";
import Tooltip from "./Tooltip";
import RenderModal from "./RenderModal";
import Pagination from "../components/Pagination";
const capitalize = (word) => {
  return word[0].toUpperCase() + word.slice(1);
};
const itemsPerPage = 10;
const TableContainer = ({ data }) => {
  const [editShowModal, setEditShowModal] = useState(false);
  const [deleteShowModal, setDeleteShowModal] = useState(false);
  const [seasonName, setSeasonName] = useState("");

  const [page, setPage] = useState({
    currentPageForTeamList: 1,
  });

  const paginate = (number, type) => {
    if (type === "TeamList") {
      setPage({ ...page, currentPageForTeamList: number });
    }
  };

  const indexOfLastPostForTeamList = page.currentPageForTeamList * itemsPerPage;
  const indexOfFirstPostForTeamList = indexOfLastPostForTeamList - itemsPerPage;

  const renderSeasonsList = () => {
    return data
      .slice(indexOfFirstPostForTeamList, indexOfLastPostForTeamList)
      .map((item, index) => (
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
              {key === "_id" ? (
                <>
                  {((page?.currentPageForTeamList - 1) * 10 + index + 1)
                    .toString()
                    .padStart(2, "0")}
                </>
              ) : (
                item[key]
              )}
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
    const keyMapping = {
      _id: "S No.",
      team_name: "Team Name",
      address: "Location",
      age_value: "Age Group",
      season_name: "Season",
      team_type: "Team Type",
      // Add more key mappings as needed
    };
    return (
      <tr>
        {Object.keys(data[0]).map((key) => (
          <th
            className={"bg-light border-top border-bottom py-2 ps-2"}
            style={{
              fontSize: FONT_SIZE.S,
            }}
          >
            {console.log("Key: " + key)}
            {capitalize(keyMapping[key] || key)}
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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "10px",
        }}
      >
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={data?.length}
          paginate={paginate}
          currentPage={page?.currentPageForTeamList}
          type="TeamList"
          setPrevBtn={() =>
            setPage({
              ...page,
              currentPageForTeamList: page.currentPageForTeamList - 1,
            })
          }
          setNextBtn={() =>
            setPage({
              ...page,
              currentPageForTeamList: page.currentPageForTeamList + 1,
            })
          }
        />
      </div>
    </div>
  );
};

export default TableContainer;
