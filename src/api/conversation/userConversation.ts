import { useQuery } from "react-query";

import axiosInstance from "../axiosInstance";

export const fetchUserConversations = async () => {
  const { data } = await axiosInstance.get(
    "/conversations/getUserConversation"
  );
  return data;
};

export const useUserConversations = () => {
  return useQuery("getUserConversation", fetchUserConversations, {
    enabled: false,
  });
};
