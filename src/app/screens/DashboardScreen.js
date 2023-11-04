import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { COLOR, FONT_SIZE } from "../utils/constants";
import DropdownContainer from "../components/DropdownContainer";
import Header from "../components/Header";

const DashboardScreen = () => {
  const [isSearch, setIsSearch] = useState("");

  return (
    <div className="container-fluid h-100 p-0">
      <Header
        searchBar={true}
        value={isSearch}
        onChange={(text) => {
          setIsSearch(text.target.value);
        }}
        CloseBtnOnClick={() => setIsSearch("")}
      />
      <div className="container-fluid py-3 border-top border-bottom">
        <div className="row">
          <div className="col">
            <h5 className="mb-0">Dashboard</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
