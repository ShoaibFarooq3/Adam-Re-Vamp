import React from "react";

import { AvatarProps } from "../../utils/interfaces";

const Avatar = ({ image }: AvatarProps) => {
  return (
    <React.Fragment>
      <img
        src={image || "/userlogo.png"}
        alt="user logo"
        className="w-8 rounded-full"
        onError={(e) => {
          e.currentTarget.src = "/userlogo.png";
        }}
      />
    </React.Fragment>
  );
};

export default Avatar;
