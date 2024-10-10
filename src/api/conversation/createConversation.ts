import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../axiosInstance";

export const useAddConversationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, { data: any }>(
    async ({ data }) => {
      try {
        const response = await axiosInstance.post("/conversations", data);
        return response?.data;
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getUserConversation");
      },
    }
  );
};
