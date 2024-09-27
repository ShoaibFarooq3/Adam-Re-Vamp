import React, { useEffect, useState } from "react";

import { Conversation, ConversationHistoryProps } from "../../utils/interfaces";
import { categorizeConversations, cleanCode } from "../../utils/utils";
import { useUserConversations } from "../../api/conversation/userConversation";
import fetchConversationById from "../../api/conversation/fetchConversationById";

const ConversationHistory = ({
  showStartPage,
  setShowStartPage,
}: ConversationHistoryProps) => {
  const { data, error, isLoading } = useUserConversations();
  const {
    mutate,
    data: conversationData,
    isLoading: isLoadingConversatiion,
  } = fetchConversationById();
  // let cleanResponse = await cleanCode(conversationData.)
  const { today, yesterday, previous30Days, older } = categorizeConversations(
    data || []
  );
  if (isLoadingConversatiion) return <div>Loading...</div>;
  if (error) return <div></div>;

  const handleGetConversation = (conversationId: string) => {
    mutate(conversationId);
    setShowStartPage(!showStartPage);
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
