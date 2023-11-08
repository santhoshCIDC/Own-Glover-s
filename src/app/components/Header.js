import React from "react";
import DropdownContainer from "./DropdownContainer";
import SearchBar from "./SearchBar";

const Header = ({
  searchBar = false,
  value,
  onChange,
  CloseBtnOnClick,
  className,
}) => {
  return (
    <div>
      <div className="container-fluid py-3">
        <div className="m-0 d-flex flex-column flex-sm-row justify-content-between align-items-center">
          {searchBar ? (
            <>
              <SearchBar
                className={className}
                value={value}
                onChange={onChange}
                CloseBtnOnClick={CloseBtnOnClick}
              />
            </>
          ) : null}
          <div className="col-sm-3"></div>
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
