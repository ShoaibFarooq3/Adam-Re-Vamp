import React, { useContext } from "react";

import { ModelContext } from "../contexts";
import { downloadOutput } from "../../utils";
import FilterPanel from "../sections/FilterPanel";
import PromptPanel from "../sections/PromptPanel";
import { LayoutProps } from "../../utils/interfaces";
import DownaloadButton from "../atoms/DownaloadButton";

const Layout = ({
  children,
  showSidebar,
  setShowSidebar,
  showStartPage,
  setIsLoggedIn,
  setShowStartPage,
  isLoggedIn,
  showFilter,
  setShowFilter,
}: LayoutProps) => {
  // model context
  const model = useContext(ModelContext);
  if (!model) throw new Error("No model");
  const state = model.state;
  return (
    <div className="flex h-[100vh] text-white">
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
      <div className="w-[60vw] flex-grow ">{children}</div>
      {showFilter && (
        <FilterPanel setShowFilter={setShowFilter} showFilter={showFilter} />
      )}
    </div>
  );
};

export default Layout;
