import React from "react";
import { FilterPanelProps } from "../../utils/interfaces";
import ColorPicker from "coloreact";
import _ from "lodash";
import ReactSlider from "react-slider";

const FilterPanel = ({ showFilter, setShowFilter }: FilterPanelProps) => {
  return (
    <div className="text-left p-4 h-[100svh] gap-2 flex flex-col ">
      <div className="flex justify-between">
        <h1 className="text-lg font-normal text-[#adadad]">Design</h1>
        {/* onClick={() => setShowFilter(!showFilter)} */}
        <span
          className="flex xl:hidden"
          onClick={() => setShowFilter(!showFilter)}
        >
          x
        </span>
      </div>
      <hr className="border-[#676767]" />
      <div className="h-[42vh] mt-2">
        <h1 className="text-xs font-semibold text-[#909090]">Parameters</h1>
        <div className="flex items-end">
          <div className="w-12 xl:w-16 lg:w-12 md:w-4">
            <label className="text-[#dedede] font-medium text-xs max-w-[20px] md:max-w-[70px]">
              {_.capitalize(_.lowerCase("param"))}
            </label>
            <ReactSlider
              max={12}
              min={0}
              // defaultValue="12"
              value={12}
              // onChange={(val) => handleParameterChange(param.name, +val)}
              className="horizontal-slider flex-1 ml-4 h-10 flex items-end mb-2 max-w-[9rem]"
              thumbClassName="slider-thumb"
              trackClassName="slider-track"
            />
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-lg font-normal text-[#909090]">Color</h1>
        <ColorPicker
          style={{
            position: "relative",
            height: "300px",
            width: "100%",
            marginTop: "10px",
          }}
          opacity={false}
          color={(colr: any) => console.log(colr)}
          onChange={(clor: any) => console.log(clor)}
        />
      </div>
      <div className="w-full">
        <button
          className={`bg-[#FF5EAB] text-black w-full rounded-md py-1.5 font-semibold disabled:bg-[#FF5EAB] duration-200 ease-in-out`}
          // disabled={!isUpdated}
          // onClick={handleGenerate}
        >
          Adjust
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
