import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
const Tooltip = ({ id, content }) => {
  return (
    <div>
      <ReactTooltip
        className="tooltip"
        id={id}
        place="bottom"
        content={content}
      />
    </div>
  );
};

export default Tooltip;
