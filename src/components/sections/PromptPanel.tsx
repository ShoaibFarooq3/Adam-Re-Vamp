import React, { useContext, useEffect, useRef, useState } from "react";

import Logo from "../atoms/Logo";
import NewProject from "../atoms/NewProject";
import LoginUserSection from "./LoginUserSection";
import { PromptPanelProps, LoginUserData } from "../../utils/interfaces";
import ConversationHistory from "../atoms/ConversationHistory";
import { useNavigate } from "react-router-dom";
import { ModelContext } from "../contexts";

const PromptPanel = ({
  showSidebar,
  setShowSidebar,
  isLoggedIn,
  setIsLoggedIn,
  showStartPage,
  setShowStartPage,
  showFilter,
  setShowFilter,
}: PromptPanelProps) => {
  const model = useContext(ModelContext);
  if (!model) throw new Error("No model");
  const state = model.state;
  const navigate = useNavigate();

  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick); // For desktop
    document.addEventListener("touchstart", handleOutsideClick); // For mobile

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  const handleNewCreation = async () => {
    console.log("handle New Creation");
    localStorage.removeItem("conversationId");
    model.source = "";
    model.lastPrompt = "";
    if (!!state?.output?.stlFileURL) {
      state.output.stlFileURL = "";
      state.output.isPreview = false;
    }
    setShowFilter(!showFilter);
    navigate("/");
    setShowStartPage(true);
  };

  const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
    if (
      componentRef.current &&
      !componentRef.current.contains(event.target as Node)
    ) {
      setShowSidebar(false);
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-col p-6 gap-4 w-full" ref={componentRef}>
        <div className="flex justify-around">
          <Logo dark={false} />
        </div>

        <div className="flex justify-around">
          <NewProject handleNewCreation={handleNewCreation} />
        </div>
        <div className="flex flex-col justify-between h-full">
          <ConversationHistory
            showStartPage={showStartPage}
            setShowStartPage={setShowStartPage}
          />
          <div>
            <LoginUserSection
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PromptPanel;
