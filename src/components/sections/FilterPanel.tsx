import React, { useContext, useEffect, useState } from "react";

import _ from "lodash";
import ColorPicker from "coloreact";
import ReactSlider from "react-slider";

import { nanoid } from "nanoid";

import { ModelContext } from "../contexts";
import { downloadOutput } from "../../utils";
import { extractParameters } from "../../utils/utils";
import DownaloadButton from "../atoms/DownaloadButton";
import { defaultModelColor } from "../../state/initial-state";
import { FilterPanelProps, Parameter } from "../../utils/interfaces";
import { useAddMessageToConversation } from "../../api/conversation/addMessageToConversation";

const FilterPanel = ({ showFilter, setShowFilter }: FilterPanelProps) => {
  const { mutate } = useAddMessageToConversation();

  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1450);
  // model context
  const model = useContext(ModelContext);
  if (!model) throw new Error("No model");

  const state = model.state;
  const [paramValue, setParamValue] = useState<Parameter[]>([]);
  const [code, setCode] = useState(""); // code
  const [paramName, setParamName] = useState("");
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [changedParams, setchangedParams] = useState<any>({});

  useEffect(() => {
    const handleData = () => {
      setCode(state.params.source);
      const params = extractParameters(state.params.source);
      setParameters(params);
    };
    handleData();
  }, [model, model.state.params.source]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1450);
    };
    // Add resize event listener
    window.addEventListener("resize", handleResize);
    // Initial check
    handleResize();
    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsDrawerOpen(false);
    } else {
      setIsDrawerOpen(true);
    }
  }, [isMobile]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleParameterChange = async (paramName: string, value: number) => {
    let temp: any = changedParams;
    temp[paramName] = value;
    setParamName(paramName);
    setchangedParams(temp);
    const updatedParameters = parameters.map((param) =>
      param.name === paramName ? { ...param, value } : param
    );
    setParamValue(updatedParameters);
    setParameters(updatedParameters);
    const updatedCode = code.replace(
      new RegExp(`${paramName}\\s*=\\s*([\\d.-]+)`),
      `${paramName} = ${value}`
    );
    setCode(updatedCode);
  };

  const isUpdated = state.params.source !== code;

  const handleAdjustButton = async () => {
    if (isUpdated) {
      model.source = code;
      model.lastPrompt = `${paramName.replace(/_/g, " ")}: ${paramValue}`;
      const container = document.getElementById("messages");
      const newMessageValue = {
        _id: nanoid(),
        userMessage: JSON.stringify(changedParams),
        aiMessage: code,
        suggestions: model.suggestions,
        adjust: true,
        timestamp: new Date().toISOString(),
        __v: 0,
      };
      const conversationID = localStorage.getItem("conversationId") ?? "";
      mutate({
        conversationID,
        messageData: newMessageValue,
      });
      setchangedParams({});
      container?.scroll({ top: container?.scrollHeight, behavior: "smooth" });
      if (isMobile) {
        setIsDrawerOpen(false);
      }
    }
  };

  return (
    <React.Fragment>
      {isMobile && !isDrawerOpen ? (
        <div className="absolute w-0 right-0 h-full z-50">
          <img
            src="/setting-icon-normal.svg"
            alt="create icon"
            className="top-[38%] fixed right-1 md:top-[38%]"
            onClick={toggleDrawer}
          />
          <DownaloadButton
            className="top-[45%] fixed right-1 md:top-[46%] "
            onClick={() => {
              downloadOutput(state);
            }}
          />
        </div>
      ) : (
        <div className="absolute right-0 xl:relative w-[350px] bg-[#212121]">
          <div className="text-left p-4 h-[100svh] gap-2 flex flex-col">
            <div className="flex justify-between">
              <h1 className="text-lg font-normal text-[#adadad]">Design</h1>
              <span className="flex xl:hidden" onClick={toggleDrawer}>
                x
              </span>
            </div>
            <hr className="border-[#676767]" />
            <div className="h-[42vh] mt-2">
              <h1 className="text-xs font-semibold text-[#909090]">
                Parameters
              </h1>
              <div className="flex items-end flex-col">
                {parameters?.map?.((param, index) => (
                  <div
                    key={`${param.name} ${index}`}
                    className="my-2 flex items-end"
                  >
                    <div className="">
                      <label className="text-[#dedede] font-medium text-xs text-justify">
                        {_.capitalize(_.lowerCase(param.name))}
                      </label>
                    </div>
                    <div className="w-40">
                      <ReactSlider
                        max={
                          Math.pow(10, param?.defaultValue.toString().length) -
                          1
                        }
                        min={0}
                        defaultValue={param.value}
                        value={paramValue[index]?.value}
                        onChange={(val) =>
                          handleParameterChange(param.name, +val)
                        }
                        className="horizontal-slider flex-1 ml-4 h-10 flex items-end mb-2 max-w-[9rem]"
                        thumbClassName="slider-thumb"
                        trackClassName="slider-track"
                      />
                    </div>
                    <div className="flex w-24">
                      <input
                        type="number"
                        name="defaultValue"
                        className="w-10 ml-2 bg-[#212121] text-[#e6e6e6] rounded-md text-center focus:bg-[#5a5a5a] focus:outline-none focus:ring-0"
                        defaultValue={param.defaultValue}
                        min={0}
                        max={
                          Math.pow(10, param?.defaultValue.toString().length) -
                          1
                        }
                        value={param.value}
                        onChange={(val) => {
                          handleParameterChange(
                            param.name,
                            parseInt(val.target.value)
                          );
                        }}
                      />
                      <p className="text-[#e6e6e6] ml-1"> mm </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h1 className="text-xs font-semibold text-[#909090] mt-2">
                Color
              </h1>
              <ColorPicker
                style={{
                  position: "relative",
                  height: "300px",
                  width: "100%",
                  marginTop: "10px",
                }}
                opacity={false}
                color={model.state.view.color}
                onChange={(color: any) => {
                  model.mutate(
                    (s) => (s.view.color = color.hexString ?? defaultModelColor)
                  );
                }}
              />
            </div>
            <div className="w-11/12 bottom-2 absolute">
              <button
                className={`bg-[#FF5EAB] text-black w-full rounded-md py-1.5 font-semibold disabled:bg-[#FF5EAB] duration-200 ease-in-out`}
                disabled={!isUpdated}
                onClick={handleAdjustButton}
              >
                Adjust
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default FilterPanel;
