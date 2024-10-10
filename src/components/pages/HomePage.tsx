import React, { ChangeEvent, useContext, useEffect, useState } from "react";
// api
import { fetchCode } from "../../api/fetchCode";
// context
import { ModelContext } from "../contexts";
// sections
import CustomizePanel from "../sections/CustomizePanel";
import ViewerPanel from "../sections/ViewerPanel1";
import PromptPanel from "../sections/PromptPanel1";
// components
import { StartPage } from "../pages/StartPage";
import Loader from "../atoms/Loader";
import LogoSymbol from "../atoms/LogoSymbol";
import SendIcon from "../atoms/SendIcon";
// primereact
import { ConfirmDialog } from "primereact/confirmdialog";
import { ProgressBar } from "primereact/progressbar";
// utils
import { addPromptToHistory, cleanCode, getPromptHistory } from "../../utils";
import Backdrop from "../atoms/Backdrop";
import ToggleButton from "../atoms/ToggleButton";

// ---------------------------------------------------------

export function HomePage() {
  // -------------------------------------
  // model context
  const model = useContext(ModelContext);
  if (!model) throw new Error("No model");
  const state = model.state;

  // -------------------------------------
  const [showStartPage, setShowStartPage] = useState(true); // start page dislay
  const [showSidebar, setShowSidebar] = useState(false); // sidebar display
  const [isLoading, setIsLoading] = useState(false); // loading status
  const [prompt, setPrompt] = useState(""); // prompt
  const [promptHistory, setPromptHistory] = useState<string[]>([]); // prompt history

  // -------------------------------------

  // handle api request
  const handleRequest = async (requestPrompt: string) => {
    if (!requestPrompt) return;
    setIsLoading(true);

    try {
      const response = await fetchCode(requestPrompt); // api call
      const cleanResponse = cleanCode(response ?? "");

      //console.log('---------\n', response, '\n---------')

      if (cleanResponse !== "404") {
        model.source = cleanResponse;
        model.lastPrompt = requestPrompt;
        handleUpdatePromptHistory(requestPrompt);
        setPrompt("");
      } else {
        alert("Your prompt is invalid !");
      }
    } catch (error) {
      console.log("ERROR: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // -------------------------------------

  // handle prompt change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e?.target?.value);
  };

  // handle add prompt to history
  const handleUpdatePromptHistory = (p: string) => {
    setPromptHistory((prev) => [p, ...prev]);
    addPromptToHistory(p);
  };

  // -------------------------------------

  // handle get prompt history
  useEffect(() => {
    const handlePromptHistory = () => {
      const results = getPromptHistory();
      setPromptHistory(results);
    };

    handlePromptHistory();
  }, []);

  // -------------------------------------
  return (
    <div className="h-screen overflow-hidden">
      {/* PAGES DISPLAY */}
      {showStartPage ? (
        <StartPage
          handleRequest={handleRequest}
          setShowStartPage={setShowStartPage}
        />
      ) : (
        <div className="h-full w-full flex-1 flex flex-col">
          <div className="flex-1 flex relative">
            {/* sidebar show button */}
            <ToggleButton
              open={showSidebar}
              onClick={() => setShowSidebar(!showSidebar)}
            />

            {/* backdrop */}
            <Backdrop show={showSidebar} />

            {/* left panel */}
            <PromptPanel
              className={`w-[20%] min-w-[250px] h-full max-md:absolute max-md:top-0 max-md:z-50 
              ${showSidebar ? "max-md:left-0 " : "max-md:-left-full mr-5"} 
              duration-300 ease-in-out`}
              promptHistory={promptHistory}
              handleRequest={handleRequest}
            />

            {/* right panel */}
            <div className="flex-1 flex flex-col relative">
              {/* 3d viewer */}
              <ViewerPanel className="flex-1" />

              <div className="p-5">
                {/* customizer */}
                <CustomizePanel />

                {/* search bar */}
                <form
                  onSubmit={() => handleRequest(prompt)}
                  className="relative w-11/12 md:w-4/5 lg:w-2/3 mx-auto rounded-full overflow-hidden"
                >
                  {/* logo symbol */}
                  <div className="absolute top-0 left-0 pl-8 h-full flex items-center justify-center">
                    <LogoSymbol />
                  </div>

                  {/* input */}
                  <input
                    placeholder="What can I make for you?"
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleRequest(prompt);
                      }
                    }}
                    className="w-full rounded-full flex border border-[#FFA5D0] text-base py-4 px-20 focus:outline-none outline-none focus:shadow-none bg-[#1D1D1D] text-white"
                    value={prompt}
                    readOnly={isLoading}
                    disabled={isLoading}
                  />

                  {/* send button */}
                  <button
                    className="absolute top-0 right-0 h-full px-4 flex items-center justify-center disabled:opacity-50 duration-150"
                    disabled={!prompt || isLoading}
                    onClick={() => handleRequest(prompt)}
                  >
                    <SendIcon dark={false} />
                  </button>
                </form>
              </div>
              <div className="custom-progress-bar">
                <ProgressBar
                  mode="indeterminate"
                  className="w-full"
                  style={{
                    visibility:
                      state.rendering ||
                      state.previewing ||
                      state.checkingSyntax
                        ? "visible"
                        : "hidden",
                    height: "6px",
                  }}
                />
              </div>

              {/* loader */}
              <Loader isLoading={isLoading} />
            </div>
          </div>
          <ConfirmDialog />
        </div>
      )}
    </div>
  );
}
