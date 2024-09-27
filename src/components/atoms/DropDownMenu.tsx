import React from "react";
import { DropDownPageProps } from "../../utils/interfaces";


const DropDownMenu = ({ handleLogout }: DropDownPageProps) => {
  return (
    <div className="absolute right-0 left-0 bottom-12 w-48 bg-[#191a1a] text-white rounded-lg shadow-lg z-10 border border-[#3e3f3f]">
      <div className="py-2">
        <span
          className="block px-4 py-2 text-sm rounded-t-lg cursor-pointer"
          onClick={() => handleLogout()}
        >
          Logout
        </span>
        <hr className="border-[#3e3f3f]" />
        <span className="block px-4 py-2 text-sm rounded-b-lg">
          Add another account
        </span>
      </div>
    </div>
  );
};

export default DropDownMenu;
