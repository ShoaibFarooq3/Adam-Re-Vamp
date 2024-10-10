// @ts-nocheck

import React, { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LogoSymbol from "./LogoSymbol";

import SendIcon from "./SendIcon";
import { RootState } from "../../store";
import { cleanCode } from "../../utils";
import { ModelContext } from "../contexts";
import { fetchCode } from "../../api/claude/fetchCode";
import { extractSuggestions } from "../../utils/utils";
import { useAddConversationMutation } from "../../api/conversation/createConversation";
import { PromptbarProps } from "../../utils/interfaces";
import { useAddMessageToConversation } from "../../api/conversation/addMessageToConversation";

const PromptBar = ({ isLoading, setIsLoading }: PromptbarProps) => {
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const navigate = useNavigate();
  const model = useContext(ModelContext);
  if (!model) throw new Error("No model");
  // const state = model?.state;
  // const lastPrompt = model?.state?.params?.lastPrompt || "";
  const [prompt, setPrompt] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e?.target?.value);
  };
  const { mutateAsync: callClaudeApi, isLoading: FetchLoading } = fetchCode();
  const { mutateAsync: callCreateConversation, isLoading: loaderOn } =
    useAddConversationMutation();
  const { mutate } = useAddMessageToConversation();

  const handleRequest = async (requestPrompt: string) => {
    if (requestPrompt && requestPrompt.trim() !== "") {
      setIsLoading(true);
      setPrompt(requestPrompt);
      const ClaudeApiResult = await callClaudeApi({ prompt: requestPrompt });
      let cleanResponse = cleanCode(ClaudeApiResult);
      const suggestionsArr = extractSuggestions(ClaudeApiResult);
      model.source = cleanResponse;
      model.lastPrompt = requestPrompt;
      model.suggestions = suggestionsArr;
      const createConversationResponse = await callCreateConversation({
        data: {
          userId: {
            _id: userId,
          },
        },
      });
      const messageData = {
        userMessage: requestPrompt,
        aiMessage: cleanResponse,
        suggestions: suggestionsArr,
        adjust: false,
      };
      const conversationID = createConversationResponse?._id;
      localStorage.setItem("conversationId", conversationID);
      const messageResponse = mutate({ conversationID, messageData });
      setIsLoading(false);
      navigate(`/${conversationID}`);
    } else {
      console.log("Enter valid prompt");
    }
  };
  return (
    <React.Fragment>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRequest(prompt);
        }}
        className="rounded-full focus:drop-shadow-[0_0_20px_rgba(255,45,146,1)] hover:drop-shadow-[0_0_6px_rgba(255,45,146,1)] p-3 flex justify-between items-center m-6 border border-[#FFA5D0] bg-[#2a2a2a] bottom-3 h-14"
      >
        <div className="flex gap-2 left-5 pointer-events-none">
          <LogoSymbol />
        </div>
        <input
          placeholder="Start building with Adam..."
          onChange={handleChange}
          className="m-5 text-white focus:outline-none w-full bg-[#2a2a2a] outline-none focus:shadow-none text-base resize-none bottom-3"
          value={prompt}
          // readOnly={isLoading}
          // disabled={isLoading}
        />
        <button
          className="duration-150"
          //   disabled={!prompt || isLoading}
          type="submit"
        >
          <SendIcon dark={false} />
        </button>
      </form>
    </React.Fragment>
  );
};

export default PromptBar;
