import { useMutation, useQueryClient } from "react-query";

import axiosInstance from "../axiosInstance";
import { ClaudeMessage } from "../../utils/types";

let conversationHistory: ClaudeMessage[] = [];
let MESSAGES: ClaudeMessage[] = [];

export const fetchCode = () => {
  const queryClient = useQueryClient();
  const ClaudeApiCallResponse = useMutation<string, Error, { prompt: string }>(
    async ({ prompt }) => {
      if (conversationHistory.length) {
        MESSAGES = [
          ...conversationHistory,
          {
            role: "user",
            content: `Take this object and Generate OpenSCAD 3D shape code for ${prompt.trim()}.`,
          },
        ];
      } else {
        MESSAGES = [
          ...conversationHistory,
          {
            role: "user",
            content: `Generate OpenSCAD 3D shape code for ${prompt.trim()}.`,
          },
        ];
      }
      try {
        const { data } = await axiosInstance.post("/fetchCode/claude", {
          MESSAGES,
        });
        return data?.response;
      } catch (error) {
        console.log("error in claude api response ", error);
        throw error;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getUserConversation");
      },
    }
  );
  return ClaudeApiCallResponse;
};
