import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../atoms/LoadingButton";
import { useAddUserMutation } from "../../api/userApi/createUser";
import { SignupData } from "../../utils/interfaces";

const SignUpPage = () => {
  const navigate = useNavigate();

  const { mutateAsync: addUserMutation } = useAddUserMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Next");
  const [passwordError, setPasswordError] = useState("");
  const [signUpState, setSignUpState] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setPasswordError("");
    await addUserMutation(
      {
        data: {
          name: "test user",
          email,
          password,
          imageUrl:
            "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Images.png",
        } as SignupData,
      },
      {
        onSuccess: () => {
          setIsLoading(false);
          navigate("/");
        },
        onError: (error: any) => {
          console.error(
            "error?.response?.data?.message",
            error?.response?.data?.message
          );
        },
      }
    );
  };

  const handleLinkButton = () => {
    setSignUpState(true);
    navigate("/");
  };
  return (
    <div className="bg-[#1A1A1A] text-white h-[100svh] flex justify-center items-center">
      <div className="w-full max-w-sm">
        <img src="/adam-logo.png" alt="adam logo" className="ml-10"></img>
        {signUpState === false ? (
          <div className="mb-8 mt-10">
            <p className="text-2xl font-semibold mb-8">Create your Account</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="username@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setButtonText("Start using Adam");
                  }}
                  className="w-full p-3 rounded-md bg-[#2C2C2C] text-white placeholder-gray-400 border border-[#FF5EAB]"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full p-3 rounded-md bg-[#2C2C2C] text-white placeholder-gray-400 border ${
                    passwordError ? "border-red-500" : "border-[#FF5EAB]"
                  }`}
                  required
                />
                {passwordError && (
                  <div className="flex">
                    <p className="text-red-500 text-sm mt-2 flex">
                      <img
                        src="/warning-sign.png"
                        alt="warning"
                        className="p-4"
                      />
                      {passwordError}
                    </p>
                  </div>
                )}
              </div>
              <LoadingButton
                className={"bg-[#FF5EAB]"}
                isLoading={isLoading}
                buttonText={buttonText}
                onClick={handleSubmit}
              />
            </form>
          </div>
        ) : (
          <div className="mb-8 mt-10 leading-4">
            <h3 className="text-2xl font-semibold">You’re all set!</h3>
            <br />
            <br />
            <br />
            <p className="text-sm font-normal">
              We’ll sent a confirmation email to your inbox. Click the link in
              the email to verify your account and get started. <br /> <br />
              <br />
              In the meantime, you can click
              <span
                className="text-[#FF5EAB] cursor-pointer"
                onClick={handleLinkButton}
              >
                &nbsp;here&nbsp;
              </span>
              to start exploring Adam. Welcome aboard!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
