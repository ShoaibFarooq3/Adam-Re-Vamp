import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { StlViewer } from "react-stl-viewer";
import { nanoid } from "nanoid";

import HeaderIcon from "../atoms/HeaderIcon";
import { Message, Parameter, ViewerPanelProps } from "../../utils/interfaces";
import {
  cleanCode,
  extractParameters,
  extractSuggestions,
  formatTime,
} from "../../utils/utils";
import Avatar from "../atoms/Avatar";
import Suggestions from "../atoms/Suggestions";
import fetchConversationById from "../../api/conversation/fetchConversationById";
import PromptBar from "../atoms/PromptBar";
import Loader from "../atoms/Loader";
import { ModelContext } from "../contexts";
import { State } from "../../state/app-state";
import { fetchCode } from "../../api/claude/fetchCode";
import { useAddMessageToConversation } from "../../api/conversation/addMessageToConversation";

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
      className={`custom-next-arrow absolute bottom-1/2 transform translate-y-1/2 bg-down-arrow cursor-pointer`}
      onClick={onClick}
    ></div>
  );
}

const ViewPanel = ({
  showSidebar,
  setShowSidebar,
  showFilter,
  setShowFilter,
  isLoading,
  setIsLoading,
  showStartPage,
  setShowStartPage,
}: ViewerPanelProps) => {
  const { mutateAsync: callClaudeApi, isLoading: FetchLoading } = fetchCode();

  const indicatorRef = useRef<HTMLDivElement>(null);
  const { id } = useParams<{ id: string }>();
  const model = useContext(ModelContext);
  if (!model) throw new Error("No model");

  const { mutate, data } = fetchConversationById();
  const { mutate: addMessage } = useAddMessageToConversation();

  const state: State = model.state;
  const lastPrompt = model?.state?.params?.lastPrompt || "";
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [indexValue, setIndexValue] = useState(0);
  const [userDataImage, setUserDataImage] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  // const [isLoading1, setIsLoading1] = useState(isLoading);
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [singleMessage, setSingleMessage] = useState("");
  const [isAnimating, setIsAnimating] = useState({
    load: false,
    class: "slide-down-and-fade-in",
  });
  const [userId, setUserId] = useState("");
  const [sliderRef, setSlideRef] = useState<number>(0);
  const [timeStamp, setTimeStamp] = useState(new Date().toISOString());

  useEffect(() => {
    const container = indicatorRef.current;
    if (container) {
      // Find the larger element
      const largerElement = container.querySelector(
        `[data-index='${sliderRef}']`
      ) as HTMLElement;
      if (largerElement) {
        const containerRect = container.getBoundingClientRect();
        const elementRect = largerElement.getBoundingClientRect();

        // Calculate scroll offsets to ensure the larger element is in view
        const offsetTop =
          elementRect.top - containerRect.top + container.scrollTop;
        const offsetBottom =
          elementRect.bottom - containerRect.top + container.scrollTop;

        // Adjust scroll position
        const containerTop = container.scrollTop;
        const containerBottom = containerTop + container.clientHeight;

        if (offsetTop < containerTop) {
          container.scrollTop = offsetTop;
        } else if (offsetBottom > containerBottom) {
          container.scrollTop = offsetBottom - container.clientHeight;
        }
      }
    }
  }, [sliderRef, messages]);

  useEffect(() => {
    setIsLoading(true);
    setShowFilter(true);
    setMessages(data?.messages);
    setUserDataImage(data?.user?.imageUrl);
    setSingleMessage(data?.messages[0]?.aiMessage);
    // let cleanResponse = cleanCode(data?.messages[0].aiMessage ?? "");
    model.source = data?.messages[0]?.aiMessage;
    model.lastPrompt = data?.messages[0]?.userMessage;
    model.suggestions = data?.messages[0]?.suggestions;
    setSuggestions(data?.messages[0]?.suggestions);
    setIsLoading(false);
  }, [data]);

  useEffect(() => {
    const handleData = () => {
      // setCode(state.params.source);
      const params = extractParameters(state?.params?.source);
      setParameters(params);
    };
    handleData();
  }, [model]);

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      mutate(id);
      model.source = data?.messages[0]?.aiMessage;
      model.lastPrompt = data?.messages[0]?.userMessage;
      setMessages(data?.messages);
      // setUserDataImage(data?.user?.imageUrl);
      // setSingleMessage(data?.messages[0]?.aiMessage);
      // setSuggestions(data?.messages[0].suggestions);
    }

    setIsLoading(false);
  }, [id]);

  const handelPrev = () => {
    if (sliderRef === 0) return;
    setIsLoading(true);
    setIsAnimating({ load: true, class: "" });
    model.source = messages?.[sliderRef - 1]?.aiMessage;
    model.lastPrompt = messages?.[sliderRef - 1]?.userMessage;
    setSlideRef(sliderRef - 1);
    setTimeStamp(messages?.[sliderRef - 1]?.timestamp);
    console.log("handelPrev ");
    setIndexValue(indexValue - 1);
    handelScroll(sliderRef - 1);
    setIsLoading(false);
  };

  const handelNext = () => {
    console.log("handelNext");
    if (sliderRef === messages?.length - 1) return;
    setIsLoading(true);
    setIsAnimating({ load: true, class: "slide-up-and-fade-out" });
    model.source = messages?.[sliderRef + 1]?.aiMessage;
    model.lastPrompt = messages?.[sliderRef + 1]?.userMessage;
    setSlideRef(sliderRef + 1);
    setTimeStamp(messages?.[sliderRef + 1]?.timestamp);
    setIsAnimating({ load: false, class: "slide-down-and-fade-in" });
    handelScroll(sliderRef + 1);
    setIndexValue(indexValue + 1);
    setIsLoading(false);
  };

  const handelScroll = (ind: number) => {
    const container = document.getElementById("messages");
    const element = document.getElementById(`mess-${ind}`);

    container?.scroll({
      top: element?.offsetTop ? element?.offsetHeight * ind : 200,
      behavior: "smooth",
    });
  };

  const handleSuggestions = async (item: string) => {
    console.log("in handle Suggestions ", item);
    const ClaudeApiResult = await callClaudeApi({ prompt: item });
    let cleanResponse = cleanCode(ClaudeApiResult);
    const suggestionsArr = extractSuggestions(ClaudeApiResult);
    model.source = cleanResponse;
    model.lastPrompt = item;
    model.suggestions = suggestionsArr;
    const newMessageValue = {
      _id: nanoid(),
      userMessage: item,
      aiMessage: cleanResponse,
      suggestions: suggestionsArr,
      adjust: false,
      timestamp: new Date().toISOString(),
      __v: 0,
    };

    setMessages([...messages, newMessageValue]);
    setSingleMessage(cleanResponse);
    setSuggestions(suggestionsArr);
    const conversationID = localStorage.getItem("conversationId") ?? "";
    const messageResponse = addMessage({
      conversationID,
      messageData: newMessageValue,
    });
    console.log("messageResponse ", messageResponse);
    mutate(conversationID);
  };
  return (
    <React.Fragment>
      {isLoading ? (
        <div className="relative flex items-center h-[100vh]">
          <Loader isLoading={isLoading} />
        </div>
      ) : (
        <React.Fragment>
          <HeaderIcon
            setShowStartPage={setShowStartPage}
            showStartPage={showStartPage}
            setShowFilter={setShowFilter}
            showFilter={showFilter}
            setShowSidebar={setShowSidebar}
            className="bg-[#3b3939]"
            showSidebar={showSidebar}
          />
          <div className="flex-1 flex flex-col justify-center relative h-full bg-[#3b3939]">
            <div className="ml-10">
              <div className="flex">
                <PrevArrow
                  onClick={() => handelPrev()}
                  sliderRef={sliderRef}
                  length={messages?.length}
                />
                <NextArrow
                  onClick={() => handelNext()}
                  sliderRef={sliderRef}
                  length={messages?.length}
                />
              </div>
              <div
                ref={indicatorRef}
                className="flex flex-col gap-y-2 items-center ml-[3rem] absolute max-h-[100px] overflow-auto py-3 h-[10%] bottom-[50%]"
              >
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
                <div className="flex flex-col justify-center relative w-full h-[60vh]">
                  {state.output?.stlFileURL ? (
                    <React.Fragment>
                      {(state.isLoading && !isAnimating.load) ||
                      FetchLoading ? (
                        <div className="flex justify-center items-center w-full h-full">
                          <Loader isLoading={true} />
                        </div>
                      ) : (
                        <div className="w-full h-full">
                          <StlViewer
                            className="stl-viewer-class"
                            showAxes={state.view.showAxes}
                            orbitControls
                            shadows={state.view.showShadows}
                            modelProps={{
                              color: model.state.view.color,
                            }}
                            url={state.output?.stlFileURL ?? ""}
                          />
                        </div>
                      )}
                    </React.Fragment>
                  ) : (
                    <div className="h-[38rem] flex justify-center items-center">
                      <Loader isLoading={true} />
                    </div>
                  )}
                </div>
                <div className="flex justify-end max-h-[15svh]">
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
                            className={`rounded-lg p-2 duration-200 ease-in-out cursor-default bg-[#2d2c2c]`}
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
                                    {formatTime(timeStamp)}
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
                <div className="flex mt-4 gap-2">
                  {suggestions?.map((item, index) => (
                    <Suggestions
                      Number={index}
                      item={item}
                      handleSuggestions={handleSuggestions}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute bottom-3 w-full">
              <PromptBar isLoading={isLoading} setIsLoading={setIsLoading} />
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ViewPanel;
