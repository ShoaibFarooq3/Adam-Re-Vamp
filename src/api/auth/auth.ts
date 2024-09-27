import { useMutation } from "react-query";
import { useDispatch } from "react-redux";

import axiosInstance from "../axiosInstance";
import { setUser } from "../../redux/slices/authSlice";
import { UserData, LoginUserData } from "../../utils/interfaces";

export const useLoginUserMutation = () => {
  const dispatch = useDispatch();
  return useMutation<LoginUserData, Error, { data: UserData }>(
    async ({ data }) => {
      const loginResponse = await axiosInstance.post("/users/auth", data);
      return loginResponse.data;
    },
    {
      onSuccess: (response) => {
        axiosInstance.defaults.headers[
          "Authorization"
        ] = `Bearer ${response.token}`;
        dispatch(setUser(response));
        localStorage.setItem("token", response.token);
      },
      onError: (error: any) => {
        console.log("login data error", error?.response?.data?.message);
      },
    }
  );
};
