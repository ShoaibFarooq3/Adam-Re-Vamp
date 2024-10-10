import React, { CSSProperties, useContext, useState } from "react";
// context
import { ModelContext } from "../contexts";
// components
import Logo from "../atoms/Logo";
// utils
import { truncateString } from "../../utils";

// ---------------------------------

interface PromptPanelProps {
  className?: string;
  style?: CSSProperties;
  promptHistory?: string[];
  handleRequest: (p: string) => {};
}

// ---------------------------------

export default function PromptPanel1({
  className,
  style,
  promptHistory,
  handleRequest,
}: PromptPanelProps) {
  // ---------------------------------

  const model = useContext(ModelContext);
  if (!model) throw new Error("No model");
  const state = model.state;

  // ---------------------------------

  // handle new creation
  const handleNewCreation = () => {
    localStorage.removeItem("conversationId");
    model.source = "";
    model.lastPrompt = "";
    if (!!state?.output?.stlFileURL) {
      state.output.stlFileURL = "";
      state.output.isPreview = false;
    }
  };

  // ---------------------------------

  return (
    <div
      className={`bg-[#1D1D1D] p-6 flex flex-col ${className ?? ""}`}
      style={{
        display: "flex",
        flexDirection: "column",
        ...(style ?? {}),
      }}
    >
      {/* logo */}
      <div className="mx-auto">
        <Logo dark={false} />
      </div>

      {/* divider */}
      <div className="border-t border-[#878787] w-full mt-10 mb-6" />

      {/* new creation */}
      <button
        onClick={handleNewCreation}
        className="border rounded-md w-full px-3 py-2 text-white flex items-center opacity-40 hover:opacity-100 duration-150"
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            fill="none"
          >
            <path
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 1v10M1 6h10"
            />
          </svg>
        </span>

        <span className="ml-2 text-sm">New Creation</span>
      </button>

      {/* divider */}
      <div className="border-t border-[#878787] w-full mt-6 mb-8" />

      {/* prompt history */}
      <div className="flex-1 max-h-[420px] overflow-y-auto">
        {promptHistory?.map?.((prompt, index) => (
          <button
            key={`${prompt} ${index}`}
            onClick={() => handleRequest(prompt)}
            className="flex items-center py-1 mb-4 hover:opacity-70 duration-150"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 9.66667C14 10.0498 13.8478 10.4172 13.5769 10.688C13.306 10.9589 12.9386 11.1111 12.5556 11.1111H3.88889L1 14V2.44444C1 2.06135 1.15218 1.69395 1.42307 1.42307C1.69395 1.15218 2.06135 1 2.44444 1H12.5556C12.9386 1 13.306 1.15218 13.5769 1.42307C13.8478 1.69395 14 2.06135 14 2.44444V9.66667Z"
                stroke="#ECECF1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p className="text-[#ECECF1] ml-3 text-sm">
              {truncateString(prompt)}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
