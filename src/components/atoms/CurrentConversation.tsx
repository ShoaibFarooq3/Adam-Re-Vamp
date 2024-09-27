import React, { useState } from "react";
import { StlViewer } from "react-stl-viewer";

const CurrentConversation = () => {
  return (
    <div className="flex-1 flex flex-col justify-center ml-10 text-left overflow-hidden">
      Current Conversation
      {/* <StlViewer style={style} orbitControls shadows url={url} /> */}
    </div>
  );
};

export default CurrentConversation;
