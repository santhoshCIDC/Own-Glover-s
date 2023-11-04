import React from "react";
import DropdownContainer from "./DropdownContainer";
import { Icon } from "@iconify/react";
import { COLOR, FONT_SIZE } from "../utils/constants";

const Header = ({ searchBar = false, value, onChange,CloseBtnOnClick }) => {
  return (
    <div>
      <div className="container-fluid py-3">
        <div className="m-0 d-flex flex-column flex-sm-row justify-content-between align-items-center">
          <div className="search-container col-sm-3">
            {searchBar ? (
              <>
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
              </>
            ) : null}
          </div>
          <DropdownContainer
            editprofile={"Edit Profile"}
            changepassword={"Change Password"}
            logout={"Logout"}
            databstoggle={"modal"}
            databstarget={"#staticBackdrop"}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
