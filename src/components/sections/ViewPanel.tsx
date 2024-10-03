import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StlViewer } from "react-stl-viewer";

import HeaderIcon from "../atoms/HeaderIcon";
import { Parameter, ViewerPanelProps } from "../../utils/interfaces";
import { cleanCode, extractParameters, formatTime } from "../../utils/utils";
import Avatar from "../atoms/Avatar";
import Suggestions from "../atoms/Suggestions";
import fetchConversationById from "../../api/conversation/fetchConversationById";
import PromptBar from "../atoms/PromptBar";
import Loader from "../atoms/Loader";
import { ModelContext } from "../contexts";

function PrevArrow(props: any) {
  const { onClick, sliderRef, length } = props;

  return (
    <div
      className={`custom-prev-arrow absolute bottom-[55%] transform -translate-y-1/2 ${
        sliderRef === 0 ? "cursor--" : "cursor-pointer"
      } bg-up-arrow`}
      onClick={onClick}
    ></div>
  );
}

function NextArrow(props: any) {
  const { onClick, sliderRef, length } = props;

  return (
    <div
      className={`custom-next-arrow absolute bottom-1/2 transform translate-y-1/2 bg-down-arrow`}
      onClick={onClick}
    ></div>
  );
}

const ViewPanel = ({
  showSidebar,
  setShowSidebar,
  showFilter,
  setShowFilter,
}: ViewerPanelProps) => {
  // debugger;
  const { id } = useParams<{ id: string }>();
  const model = useContext(ModelContext);
  if (!model) throw new Error("No model");
  const {
    mutate,
    data,
    isLoading: isLoadingConversatiion,
  } = fetchConversationById();
  const state = model.state;
  const lastPrompt = model?.state?.params?.lastPrompt || "";
  const [messages, setMessages] = useState([]);
  const [indexValue, setIndexValue] = useState(0);
  const [userDataImage, setUserDataImage] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [singleMessage, setSingleMessage] = useState("");
  useEffect(() => {
    setIsLoading(true);
    setShowFilter(true);
    setMessages(data?.messages);
    setUserDataImage(data?.user?.imageUrl);
    setSingleMessage(data?.messages[0].aiMessage);
    let cleanResponse = cleanCode(data?.messages[0].aiMessage ?? "");
    model.source = cleanResponse;
    model.lastPrompt = data?.messages[0].userMessage;
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    // setSuggestions(messages?.messages[0].suggestions);
  }, [data]);

  useEffect(() => {
    const handleData = () => {
      // setCode(state.params.source);
      const params = extractParameters(state.params.source);
      setParameters(params);
    };
    handleData();
  }, [model]);

  useEffect(() => {
    if (id) {
      mutate(id);
      setMessages(data?.messages);
    }
  }, [id, mutate]);

  const handelPrev = () => {
    console.log("handelPrev ");
    setIndexValue(indexValue - 1);
  };

  const handelNext = () => {
    console.log("handelNext");
    setIndexValue(indexValue + 1);
  };
  const handleNewButton = () => {
    alert(singleMessage);
  };
  console.log("state in view panel ", model);
  return (
    <React.Fragment>
      {isLoading ? (
        <div className="relative flex items-center h-[100vh]">
          <Loader isLoading={isLoading} />
        </div>
      ) : (
        <React.Fragment>
          <HeaderIcon
            setShowSidebar={setShowSidebar}
            className="bg-[#3b3939]"
            showSidebar={showSidebar}
          />
          <button onClick={handleNewButton}>Data button</button>
          <div className="flex-1 flex flex-col justify-center ml-10 relative h-[100svh]">
            <div className="flex">
              <PrevArrow
                onClick={() => handelPrev()}
                sliderRef={0}
                // length={messages?.[messages.length]}
              />
              <NextArrow
                onClick={() => handelNext()}
                sliderRef={1}
                // length={messages?.[messages?.length]}
              />
            </div>
            <div className="flex flex-col gap-y-2 items-center ml-[3rem] absolute max-h-[100px] overflow-auto py-3 h-[10%] bottom-[50%]">
              {messages?.map((message: any, index: number) => (
                <div
                  data-index={index}
                  className={`bg-white w-0.5 rounded-lg transition-all duration-300 ${
                    index === indexValue ? "min-h-[30px]" : "min-h-[10px]"
                  }`}
                  key={index}
                ></div>
              ))}
            </div>
            <div>
              <div className="flex flex-col justify-center relative w-full">
                {state.output?.stlFileURL ? (
                  <StlViewer
                    className="stl-viewer-class"
                    showAxes={state.view.showAxes}
                    orbitControls
                    shadows={state.view.showShadows}
                    modelProps={{
                      color: model?.state?.view?.color,
                    }}
                    url={state.output?.stlFileURL ?? ""}
                  />
                ) : (
                  <div className="h-[38rem] flex justify-center items-center">
                    <Loader isLoading={true} />
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <div
                  id="messages"
                  className="flex flex-col gap-4 w-full max-w-[400px] overflow-scroll min-w-[200px]"
                >
                  {messages?.map((item: any, key: number) => {
                    return (
                      <div key={key} className="relative" id={`mess-${key}`}>
                        {item.adjust && (
                          <div className="bg-[#634D57] px-2 py-1 w-full absolute rounded-t-lg top-0 text-[#FB66A5] flex justify-end gap-4 text-sm">
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 10 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8 18V12H10V14H18V16H10V18H8ZM0 16V14H6V16H0ZM4 12V10H0V8H4V6H6V12H4ZM8 10V8H18V10H8ZM12 6V0H14V2H18V4H14V6H12ZM0 4V2H10V4H0Z"
                                fill="#FB66A5"
                              />
                            </svg>
                            <p>Adjustment</p>
                          </div>
                        )}
                        <div
                          className={`rounded-lg p-2 duration-200 ease-in-out cursor-default bg-[#3b3b3b]`}
                        >
                          <div className="">
                            {item?.adjust ? (
                              item?.userMessage && (
                                <div className="flex flex-wrap gap-2 pt-4 pl-3 w-full mr-3 mt-5">
                                  {Object.entries(
                                    JSON.parse(item?.userMessage)
                                  ).map(([key, value]: any) => (
                                    <p
                                      className={`capitalize text-sm text-justify text-white`}
                                    >
                                      {key.replace("_", " ")} :
                                      <span className="bg-black px-2 py-1 ml-1 rounded-full text-white">
                                        {value}
                                      </span>
                                    </p>
                                  ))}
                                </div>
                              )
                            ) : (
                              <React.Fragment>
                                <p
                                  className={`pl-3 w-full mr-3 text-sm text-justify text-white ${
                                    item.adjust && "mt-7"
                                  }`}
                                >
                                  {item.userMessage}
                                </p>
                                <div className="text-[#949494] p-1 text-xs right-0 flex justify-end">
                                  {formatTime(item.timestamp)}
                                </div>
                              </React.Fragment>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {userDataImage && (
                  <div className="ml-3">
                    <Avatar image={userDataImage} />
                  </div>
                )}
              </div>
            </div>
            <div className="flex mt-4 gap-2">
              {suggestions?.map(({ item, index }: any) => (
                <Suggestions Number={index} item={item} />
              ))}
            </div>
            <div className="absolute bottom-0 w-full">
              <PromptBar />
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ViewPanel;
