import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

import Toast from "../atoms/Toast";
import LoadingButton from "../atoms/LoadingButton";
import { useLoginUserMutation } from "../../api/auth/auth";
import { useCheckUserMutation } from "../../api/userApi/userApi";
import { LoginPageProps } from "../../utils/interfaces";

const LoginPage = ({ isLoggedIn, setIsLoggedIn }: LoginPageProps) => {
  const navigate = useNavigate();

  const {
    mutateAsync: loginUserMutation,
    error: loginUserError,
    isLoading: loadingUser,
  } = useLoginUserMutation();

  const {
    mutate: checkUser,
    data: userExist,
    error: checkUserError,
    isLoading: checkingUser,
  } = useCheckUserMutation();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(isLoggedIn);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Continue");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [toastMessage, setToastMessage] = useState({ message: "", type: "" });
  const [userPresent, setUserPresent] = useState(false);

  useEffect(() => {
    setOpen(isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    setUserPresent(true);
  }, [userExist]);

  const handleBlur = () => {
    if (!email) {
      setError("Email is required");
    } else {
      checkUser(email);
      setUserPresent(true);
      setError("");
    }
  };

  const handleContinueButton = async () => {
    checkUser(email);
    setIsLoading(true);
    if (email) {
      if (userPresent) {
        setError("");
        setShowPasswordField(true);
        setButtonText("SignIn");
        setIsLoading(false);
        if (email && password) {
          loginUserMutation({ data: { email, password } });
          if (loginUserError) {
            setToastMessage({
              message: "Invalid email or password",
              type: "error",
            });
            setShowToast(true);
            setError("Invalid email or password");
          }
          setIsLoggedIn(!isLoggedIn);
          setToastMessage({
            message: "Login Sucessfull",
            type: "sucess",
          });
          setShowToast(true);
        }
      } else {
        setError("No account found, Sign up to access Adam");
        setShowPasswordField(false);
        setButtonText("Continue");
        setIsLoading(false);
      }
    } else {
      setError("Email is required");
      setToastMessage({
        message: "Email is required",
        type: "error",
      });
      setShowToast(true);
    }
    setIsLoading(false);
  };

  const handleSignUp = () => {
    ("/sign-up");
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={() => setIsLoggedIn(!isLoggedIn)}
        className="relative bg-black z-20"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="fixed inset-0 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-full max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-black px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setOpen(false);
                          setIsLoggedIn(!isLoggedIn);
                        }}
                        className="inline-flex justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm"
                      >
                        X
                      </button>
                    </div>
                    <div className="mt-2 gap-3">
                      <img
                        src="/logo-adam.png"
                        className="w-[50px] block mx-auto"
                        alt="adam logo"
                      />
                      <p className="text-lg mt-4 text-center text-white">
                        Sign into Adam
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-black w-full items-center px-4 py-3 sm:px-6">
                <input
                  type="email"
                  value={email}
                  className={`bg-[#111111] border ${
                    error ? "border-red-500" : "border-[#111111]"
                  } text-white text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5`}
                  placeholder="username@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={handleBlur}
                  required
                />
                {error && (
                  <p className="text-red-500 text-sm mt-1 bg-black">{error}</p>
                )}
              </div>
              {showPasswordField && (
                <div className="bg-black w-full items-center px-4 py-3 sm:px-6">
                  <input
                    type="password"
                    className={`bg-[#111111] border ${
                      error ? "border-red-500" : "border-[#111111]"
                    } text-white text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5`}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-1 bg-black">
                      {error}
                    </p>
                  )}
                </div>
              )}
              <div className=" bg-black px-4 py-3 sm:px-6 flex flex-col gap-2">
                <React.Fragment>
                  <LoadingButton
                    className={"bg-white"}
                    isLoading={isLoading}
                    buttonText={buttonText}
                    onClick={handleContinueButton}
                  />
                  {showPasswordField == false ? (
                    <button
                      type="button"
                      data-autofocus
                      onClick={handleSignUp}
                      className="mt-3 w-full justify-center rounded-md bg-[#FF5EAB] px-3 py-2 text-sm text-grey-700 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                    >
                      Sign up for Adam
                    </button>
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}
                </React.Fragment>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <Toast
        showToast={showToast}
        toastMessage={toastMessage}
        onClose={() => {
          setShowToast(false);
          setToastMessage({ message: "", type: "" });
        }}
      />
    </React.Fragment>
  );
};

export default LoginPage;
