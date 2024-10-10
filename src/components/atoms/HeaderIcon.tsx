import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ModelContext } from "../contexts";
import MenuToggleButton from "./MenuToggleButton";
import { HeaderIconProps } from "../../utils/interfaces";

const HeaderIcon = ({
  className,
  showSidebar,
  setShowSidebar,
  setShowFilter,
  setShowStartPage,
}: HeaderIconProps) => {
  const model = useContext(ModelContext);
  if (!model) throw new Error("No model");
  const state = model.state;
  const navigate = useNavigate();

  const handleNewChat = () => {
    model.source = "";
    model.lastPrompt = "";
    if (!!state?.output?.stlFileURL) {
      state.output.stlFileURL = "";
      state.output.isPreview = false;
    }
    setShowFilter(false);
    setShowStartPage(true);
    navigate("/");
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
      <div className="reltive flex justify-end mr-4" onClick={handleNewChat}>
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
