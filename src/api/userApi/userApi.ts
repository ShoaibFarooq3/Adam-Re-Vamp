import { useMutation } from "react-query";

import axiosInstance from "../axiosInstance";

export const checkUserExists = async (email: string) => {
  const response = await axiosInstance.post("/users/check/user", { email });
  return response.data;
};

export const useCheckUserMutation = () => {
  return useMutation(async (email: string) => {
    return checkUserExists(email);
  });
};
