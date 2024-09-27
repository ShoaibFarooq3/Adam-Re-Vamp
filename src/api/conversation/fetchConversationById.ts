import { useMutation } from "react-query";

import axiosInstance from "../axiosInstance";

const fetchData = async (id: string) => {
  const { data } = await axiosInstance.get(`/conversations/${id}`);
  return data;
};

const fetchConversationById = () => {
  return useMutation((id: string) => fetchData(id));
};

export default fetchConversationById;
