import React from "react";
import { Icon } from "@iconify/react";
import { CSVLink } from "react-csv";

const DropdownItem = ({
  icon,
  text,
  color,
  overlay,
  onMouseOver,
  onMouseOut,
  onClick,
  CSVFormat = false,
  csvData,
  filename,
}) => {
  return (
    <div
      className="d-flex align-items-center"
      style={{
        padding: "5px",
        backgroundColor: overlay ? "#f7f5ff" : "white",
      }}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <Icon icon={icon} width="20" height="20" />
      <div className="d-flex align-items-center user-filter">
        {CSVFormat ? (
          <CSVLink data={csvData} target="_blank" filename={filename}>
            <span style={{ color }}>{text}</span>
          </CSVLink>
        ) : (
          <span style={{ color }}>{text}</span>
        )}

        {(text === "CSV Format" || text === "PDF Format") && (
          <Icon
            icon="tdesign:arrow-triangle-down-filled"
            style={{ color }}
            width="18"
            height="18"
          />
        )}
      </div>
    </div>
  );
};

export default DropdownItem;
