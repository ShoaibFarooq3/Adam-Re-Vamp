import { useMutation, useQueryClient } from "react-query";

import axiosInstance from "../axiosInstance";
import { SignupData } from "../../utils/interfaces";

const useAddUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, { data: SignupData }>(
    async ({ data }) => {
      try {
        await axiosInstance.post("/users/", data);
      } catch (error) {
        console.log("error : ", error);
        throw error;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getUser");
        queryClient.invalidateQueries("getUserConversation");
      },
    }
  );
};

export { useAddUserMutation };
