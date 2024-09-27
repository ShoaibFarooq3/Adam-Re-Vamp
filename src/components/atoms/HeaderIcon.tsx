import React, { useState } from "react";

import MenuToggleButton from "./MenuToggleButton";
import { HeaderIconProps } from "../../utils/interfaces";

const HeaderIcon = ({
  className,
  showSidebar,
  setShowSidebar,
}: HeaderIconProps) => {
  const handleNewChat = () => {
    console.log("handleNewChat");
  };

  return (
    <div
      className={`w-full flex items-center justify-between lg:hidden pt-5 ${className}`}
    >
      <div className="">
        <MenuToggleButton
          open={showSidebar}
          onClick={() => setShowSidebar(!showSidebar)}
        />
      </div>
      <div className="flex justify-end">
        <img
          src="/adam-logo.png"
          className="w-[5.0625rem] ml-14"
          alt="adam logo"
        />
      </div>
      <div
        className="reltive flex justify-end mr-4 z-[100]"
        onClick={handleNewChat}
      >
        <img
          src="/create-icon.svg"
          alt="create icon"
          className=" w-[1.25rem] justify-end "
          onClick={handleNewChat}
        />
      </div>
    </div>
  );
};

export default HeaderIcon;
