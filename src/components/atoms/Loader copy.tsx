import React from "react";
import { LoaderProps } from "../../utils/interfaces";

const Loader = ({ isLoading }: LoaderProps) => {
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
