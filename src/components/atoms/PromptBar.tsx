import React, { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import LogoSymbol from "./LogoSymbol";

import SendIcon from "./SendIcon";
import { fetchCode } from "../../api/claude/fetchCode";
import { cleanCode, extractSuggestions } from "../../utils/utils";
import { ModelContext } from "../contexts";

const PromptBar = () => {
  const navigate = useNavigate();
  const model = useContext(ModelContext);
  if (!model) throw new Error("No model");
  // const state = model?.state;
  // const lastPrompt = model?.state?.params?.lastPrompt || "";
  const [prompt, setPrompt] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e?.target?.value);
  };
  const { mutateAsync: callClaudeApi, isLoading } = fetchCode();

  const handleRequest = async (requestPrompt: string) => {
    if (requestPrompt && requestPrompt.trim() !== "") {
      setPrompt(requestPrompt);
      const ClaudeApiResult = await callClaudeApi({ prompt: requestPrompt });
      let cleanResponse = cleanCode(ClaudeApiResult);
      const suggestionsArr = extractSuggestions(ClaudeApiResult);
      model.source = cleanResponse;
      model.lastPrompt = requestPrompt;
      navigate("/view-panel");
    } else {
      console.log("input correct serach");
    }
  };

  return (
    <React.Fragment>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRequest(prompt);
        }}
        className="rounded-full focus:drop-shadow-[0_0_20px_rgba(255,45,146,1)] hover:drop-shadow-[0_0_6px_rgba(255,45,146,1)] p-3 flex justify-between items-center m-10 border border-[#FFA5D0] bg-[#2a2a2a] bottom-0"
      >
        <div className="flex gap-2">
          <LogoSymbol />
          <input
            placeholder="Start building with Adam..."
            onChange={handleChange}
            className=" text-white focus:outline-none w-full bg-[#2a2a2a] outline-none focus:shadow-none text-base "
            value={prompt}
            readOnly={isLoading}
            disabled={isLoading}
          />
        </div>

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
