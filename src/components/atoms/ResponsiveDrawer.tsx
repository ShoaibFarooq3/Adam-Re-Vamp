import React, { useEffect, useState } from "react";
import DownaloadButton from "./DownaloadButton";
import FilterPanel from "../sections/FilterPanel";
import { FilterPanelProps } from "../../utils/interfaces";

const ResponsiveDrawer = ({ showFilter, setShowFilter }: FilterPanelProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1450);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1450);
    };
    // Add resize event listener
    window.addEventListener("resize", handleResize);
    // Initial check
    handleResize();
    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsDrawerOpen(false);
      setShowFilter(false);
    } else {
      setIsDrawerOpen(true);
      setShowFilter(true);
    }
  }, [isMobile]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setShowFilter(!showFilter);
  };

  return (
    <div
      className={`drawer-container sm:absolute md:relative ${
        isDrawerOpen && isMobile ? "w-full left-0" : ""
      } md:max-w-[360px]`}
    >
      {/* Drawer panel */}
      {isDrawerOpen && (
        <React.Fragment>
          {isMobile ? (
            <div className="absolute right-0 w-full">
              <span
                className="absolute right-2 top-2 h-10 text-3xl text-white"
                onClick={toggleDrawer}
              >
                ×
              </span>
              <FilterPanel
                setShowFilter={setShowFilter}
                showFilter={showFilter}
              />
            </div>
          ) : (
            <></>
            // <FilterPanel
            //   setShowFilter={setShowFilter}
            //   showFilter={showFilter}
            // />
          )}
        </React.Fragment>
      )}
      {isMobile && !isDrawerOpen ? (
        <div className="absolute w-0 right-0 h-full">
          <img
            src="/setting-icon-normal.svg"
            alt="create icon"
            className="top-[38%] fixed right-1 md:top-[38%]"
            onClick={toggleDrawer}
          />
          <DownaloadButton
            className="top-[45%] fixed right-1 md:top-[46%]"
            onClick={() => {
              //   downloadOutput(state);
            }}
          />
        </div>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </div>
  );
};

export default ResponsiveDrawer;
