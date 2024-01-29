import React from "react";
import { Icon } from "@iconify/react";

const DropdownItem = ({
  icon,
  text,
  color,
  overlay,
  onMouseOver,
  onMouseOut,
  onClick,
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
        <span style={{ color }}>{text}</span>
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
