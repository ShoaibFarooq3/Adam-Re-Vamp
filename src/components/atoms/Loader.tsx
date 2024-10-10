import React from "react";
import { LoadingProps } from "../../utils/interfaces";

const Loader = ({ isLoading }: LoadingProps) => {
  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 rounded-full py-2 px-12 ${
        isLoading ? "opacity-100" : "opacity-0"
      } duration-150 ease-in-out`}
    >
      <div className="loader" />
    </div>
  );
};

export default Loader;
