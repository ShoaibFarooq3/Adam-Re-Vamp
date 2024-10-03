import React, { useEffect } from "react";

import PromptPanel from "../sections/PromptPanel";
import FilterPanel from "../sections/FilterPanel";
import { LayoutProps } from "../../utils/interfaces";
import DownaloadButton from "../atoms/DownaloadButton";

const Layout: React.FC<LayoutProps> = ({
  children,
  showSidebar,
  setShowSidebar,
  showStartPage,
  setIsLoggedIn,
  setShowStartPage,
  isLoggedIn,
  showFilter,
  setShowFilter,
}) => {
  return (
    <div className="flex h-[100vh]">
      <div
        className={`min-w-[250px] max-w-[400px] bg-[#212121] h-[100vh] absolute z-10 lg:relative ${
          showSidebar ? "flex" : "hidden lg:flex"
        }`}
      >
        <PromptPanel
          showStartPage={showStartPage}
          setShowStartPage={setShowStartPage}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      </div>
      <div className="w-[60vw] bg-[#191a1a] flex-grow">{children}</div>
      {showFilter ? (
        <div className="w-[350px] bg-[#212121] absolute right-0 xl:relative">
          <FilterPanel setShowFilter={setShowFilter} showFilter={showFilter} />
        </div>
      ) : (
        <div className="absolute w-0 right-0 h-full block xl:hidden">
          <img
            src="/setting-icon-normal.svg"
            alt="create icon"
            className="top-[38%] fixed right-1 md:top-[38%]"
            onClick={() => setShowFilter(!showFilter)}
          />
          <DownaloadButton
            className="top-[45%] fixed right-1 md:top-[46%]"
            onClick={() => {
              //   downloadOutput(state);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Layout;
