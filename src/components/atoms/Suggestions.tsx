import React from "react";
import { SuggestionsProps } from "../../utils/interfaces";
import { getColors } from "../../utils/utils";

const Suggestions = ({ Number, item, handleSuggestions }: SuggestionsProps) => {
  return (
    <div>
      <button
        key={Number}
        className={`rounded-full 
                        flex justify-center items-center
                        p-[8px_12px_9px_12px]
                        text-[#D7D7D7] text-sm 
                        font-dm-sans font-normal
                        leading-[14px] 
                        hover:opacity-80 duration-150 ease-in-out cursor-default whitespace-nowrap hover:cursor-pointer`}
        style={{ backgroundColor: `${getColors(Number)}` }}
        onClick={() => handleSuggestions(item)}
      >
        {item}
      </button>
    </div>
  );
};

export default Suggestions;
