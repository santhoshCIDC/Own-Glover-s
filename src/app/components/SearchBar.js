import { Icon } from "@iconify/react";
import React from "react";
import { COLOR, FONT_SIZE } from "../utils/constants";

const SearchBar = ({ value, onChange, CloseBtnOnClick, style, className }) => {
  return (
    <div className={className} style={style}>
      <Icon icon="carbon:search" width={20} height={20} />
      <input
        className="form-control border-0 rounded-pill pl-5"
        type="text"
        placeholder="Search..."
        aria-label="Search"
        style={{
          backgroundColor: COLOR.LIGHT_GREY,
          fontSize: FONT_SIZE.S,
        }}
        value={value}
        onChange={onChange}
      />
      <Icon
        icon="carbon:close"
        cursor={"pointer"}
        width={23}
        height={23}
        onClick={CloseBtnOnClick}
      />
    </div>
  );
};

export default SearchBar;
