import axiosInstance from "../axiosInstance";

export const fetchOpenScadCode = async (data: any) => {
  const response = await axiosInstance.post("/fetchCode/claude", data);
  return response.data;
};
