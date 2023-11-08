import { Icon } from "@iconify/react";
import React from "react";
import { FONT_SIZE } from "../utils/constants";

const InputContainer = ({
  type,
  value,
  onChange,
  rightIcon,
  onClickRightIcon,
  placeholder,
}) => {
  return (
    <div>
      <div style={{ position: "relative" }}>
        <input
          style={{
            fontSize: FONT_SIZE.S,
            outlineColor: "lightgrey",
            height: 35,
            borderRadius: 3,
          }}
          type={type}
          className="w-100 p-1 border ps-2"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <Icon
          icon={rightIcon}
          width="23"
          height="23"
          style={{
            position: "absolute",
            right: 15,
            top: 6,
            cursor: "pointer",
          }}
          onClick={onClickRightIcon}
        />
      </div>
    </div>
  );
};

export default InputContainer;
