import React from "react";
import { FilterPanelProps } from "../../utils/interfaces";

const FilterPanel = ({ showFilter, setShowFilter }: FilterPanelProps) => {
  return (
    <div className="text-left p-4 ">
      <div className="flex justify-between">
        <h1 className="text-lg font-normal text-[#adadad] mt-3 2xl:mt-6">
          Design
        </h1>
        {/* <span className="mt-3 2xl:mt-6">x</span> */}
      </div>
      <hr className="mt-6 border-[#676767]" />
      <h1 className="text-xs font-semibold text-[#909090] mt-3">Parameters</h1>
    </div>
  );
};

export default FilterPanel;
