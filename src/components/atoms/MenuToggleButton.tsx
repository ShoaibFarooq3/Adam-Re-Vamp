import React from "react";
import { MenuToggleButtonProps } from "../../utils/types";

const MenuToggleButton = ({ open, ...props }: MenuToggleButtonProps) => {
  return (
    <React.Fragment>
      <img
        src="/MenuBar.svg"
        alt="Menu bar"
        className={`absolute left-6 w-[1.5rem]  ${open && "hidden"}`}
        {...props}
      />
    </React.Fragment>
  );
};

export default MenuToggleButton;
