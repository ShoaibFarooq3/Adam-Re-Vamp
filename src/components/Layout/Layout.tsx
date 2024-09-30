import React from "react";

import PromptPanel from "../sections/PromptPanel";
import FilterPanel from "../sections/FilterPanel";
import { LayoutProps } from "../../utils/interfaces";

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
          setShowFilter={setShowFilter}
          showFilter={showFilter}
          showStartPage={showStartPage}
          setShowStartPage={setShowStartPage}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      </div>
      <div className="w-[60vw] bg-[#191a1a] flex-grow">{children}</div>
      {showFilter && (
        <div className="w-[20vw] bg-[#212121] hidden lg:block">
          <FilterPanel setShowFilter={setShowFilter} showFilter={showFilter} />
        </div>
      )}
    </div>
  );
};

export default Layout;
