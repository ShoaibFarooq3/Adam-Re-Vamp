import React, { FC, useEffect } from "react";

interface ToastProps {
  showToast: boolean;
  toastMessage: { message: string; type: string };
  onClose: () => void;
}

const Toast: FC<ToastProps> = ({ showToast, toastMessage, onClose }) => {
  useEffect(() => {
    let toastTimer: NodeJS.Timeout;
    if (showToast) {
      toastTimer = setTimeout(() => {
        onClose();
      }, 3000);
    }
    return () => clearTimeout(toastTimer);
  }, [showToast]);

  return (
    <div
      className={`toast flex justify-center md:pl-[20%] z-[5000] ${
        showToast ? "show" : ""
      }`}
    >
      <div className="py-1 pl-2 pr-4 rounded-md bg-[#FED7E8] text-black">
        {toastMessage?.type === "download" && (
          <div className="flex gap-2">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="scale-[80%]"
            >
              <circle
                cx="13"
                cy="13"
                r="12"
                fill="#16B464"
                stroke="#34C77D"
                strokeWidth="2"
              />
              <path
                d="M7 13.7143L10.9394 18L20 9"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            <span>Your stl file has been downloaded</span>
          </div>
        )}

        {toastMessage?.type === "error" && <p>{toastMessage.message}</p>}
        {toastMessage?.type === "sucess" && <p>{toastMessage.message}</p>}
      </div>
    </div>
  );
};

export default Toast;
