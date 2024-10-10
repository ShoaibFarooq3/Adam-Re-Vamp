import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../axiosInstance";
import { MessageData } from "../../utils/interfaces";

export const useAddMessageToConversation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: { conversationID: string; messageData: MessageData }) =>
      axiosInstance.post(
        `/conversations/${data.conversationID}/messages`,
        data.messageData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getUserConversation");
      },
    }
  );
};
