import React, { useContext, useEffect, useState } from "react";

import { Conversation, ConversationHistoryProps } from "../../utils/interfaces";
import { categorizeConversations, cleanCode } from "../../utils/utils";
import { useUserConversations } from "../../api/conversation/userConversation";
import fetchConversationById from "../../api/conversation/fetchConversationById";
import { ModelContext } from "../contexts";
import { useNavigate } from "react-router-dom";

const ConversationHistory = ({
  showStartPage,
  setShowStartPage,
}: ConversationHistoryProps) => {
  const navigate = useNavigate();
  const model = useContext(ModelContext);
  if (!model) throw new Error("No model");
  const { data, error, isLoading, refetch } = useUserConversations();

  // let cleanResponse = await cleanCode(conversationData)
  const { today, yesterday, previous30Days, older } = categorizeConversations(
    data || []
  );

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error in Loading...</div>;

  const handleGetConversation = (conversationId: string) => {
    navigate(`/${conversationId}`);
  };
  return (
    <div className="max-h-[80vh] p-4">
      {today?.length > 0 && (
        <React.Fragment>
          <h2 className="text-[#c1c1c1] text-[12px] font-bold mb-3">Today</h2>
          {today.map((item: Conversation, index: number) => (
            <div className="w-full hover:opacity-70 duration-150" key={index}>
              <div
                className="p-1 text-white rounded-md mb-4 cursor-pointer"
                onClick={() => handleGetConversation(item._id)}
              >
                <h3 className="truncate capitalize">{item.title}</h3>
              </div>
            </div>
          ))}
        </React.Fragment>
      )}
      {yesterday.length > 0 && (
        <React.Fragment>
          <h2 className="text-[#c1c1c1] text-[12px] font-bold mb-3">
            Yesterday
          </h2>
          {yesterday.map((item: Conversation, index: number) => (
            <div className="w-full hover:opacity-70 duration-150" key={index}>
              <div
                className="p-1 text-white rounded-md mb-4 cursor-pointer"
                onClick={() => handleGetConversation(item._id)}
              >
                <h3 className="truncate capitalize">{item.title}</h3>
              </div>
            </div>
          ))}
        </React.Fragment>
      )}
      {previous30Days.length > 0 && (
        <React.Fragment>
          <h2 className="text-[#c1c1c1] text-[12px] font-bold mb-3">
            Previous 30 Days
          </h2>
          {previous30Days.map((item: Conversation, index: number) => (
            <div className="w-full hover:opacity-70 duration-150" key={index}>
              <div
                className="p-1 text-white rounded-md mb-4 cursor-pointer"
                onClick={() => handleGetConversation(item._id)}
              >
                <h3 className="truncate capitalize">{item.title}</h3>
              </div>
            </div>
          ))}
        </React.Fragment>
      )}

      {older.length > 0 && (
        <React.Fragment>
          <h2 className="text-[#c1c1c1] text-[12px] font-bold mb-3">Older</h2>
          {older.map((item: Conversation, index: number) => (
            <div className="w-full hover:opacity-70 duration-150" key={index}>
              <div
                className="p-1 text-white rounded-md mb-4 cursor-pointer"
                onClick={() => handleGetConversation(item._id)}
              >
                <h3 className="truncate capitalize">{item.title}</h3>
              </div>
            </div>
          ))}
        </React.Fragment>
      )}
    </div>
  );
};

export default ConversationHistory;
