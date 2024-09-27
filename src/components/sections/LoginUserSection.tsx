import React, { useEffect, useRef, useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";

import Avatar from "../atoms/Avatar";
import LoginPage from "./LoginPage";
import { RootState } from "../../store";
import SettingsIcon from "../atoms/SettingsIcon";
import DropDownMenu from "../atoms/DropDownMenu";
import { clearUser } from "../../redux/slices/authSlice";

const LoginUserSection = ({ isLoggedIn, setIsLoggedIn }) => {
  const dispatch = useDispatch();

  const componentRef = useRef<HTMLDivElement>(null);
  const { user } = useSelector((state: RootState) => ({
    user: state.auth.user,
  }));

  const [isOpen, setIsOpen] = useState(isLoggedIn);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick); // For desktop
    document.addEventListener("touchstart", handleOutsideClick); // For mobile

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  const handleLogout = async () => {
    localStorage.clear();
    dispatch(clearUser());
    setIsLoggedIn(!isLoggedIn);
    setDropdownOpen(!dropdownOpen);
  };

  const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
    if (
      componentRef.current &&
      !componentRef.current.contains(event.target as Node)
    ) {
      setIsOpen(true);
    }
  };

  return (
    <React.Fragment>
      {user ? (
        <div className="relative text-left">
          <div className="flex justify-between">
            <div
              className="flex flex-row items-center gap-3 cursor-pointer pt-1 pl-2 hover:bg-[#3b3b3b] w-44 rounded-full h-12"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <Avatar image={user?.imageUrl} />
              <p className="text-white text-xs truncate max-w-[150px]">
                {user?.name ? user?.name : user?.email}
              </p>
            </div>
            <div className="pt-2">
              <SettingsIcon />
            </div>
          </div>
          {dropdownOpen && <DropDownMenu handleLogout={handleLogout} />}
        </div>
      ) : (
        <React.Fragment>
          <button
            type="button"
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className="flex gap-3 w-full text-black bg-[#FF5EAB] font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 bottom-0"
          >
            <FiLogIn />
            Login
          </button>
          <LoginPage
            // setPromptHistory={setPromptHistory}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            // setShowStartPage={setShowStartPage}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default LoginUserSection;
