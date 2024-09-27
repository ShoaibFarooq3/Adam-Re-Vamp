import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Toast from "../atoms/Toast";
import Layout from "../Layout/Layout";
import { RootState } from "../../store"; // Adjust this import based on your file structure
import PromptBar from "../atoms/PromptBar";
import StartPage from "../sections/StartPage";
import { clearUser } from "../../redux/slices/authSlice";
import ViewPanel from "../sections/ViewPanel";
// import { ModelContext } from "../contexts/contexts";
const HomePage = () => {
  const dispatch = useDispatch();

  // const model = useContext(ModelContext);
  // if (!model) throw new Error("No model");
  // const state = model.state;
  // const lastPrompt = model?.state?.params?.lastPrompt || "";

  const { isAuthenticated } = useSelector((state: RootState) => ({
    isAuthenticated: state.auth.isAuthenticated,
  }));

  const [isLoading, setIsLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showStartPage, setShowStartPage] = useState(true);
  const [showToast, setShowToast] = useState<boolean>(false); // display toast
  const [isLoggedIn, setIsLoggedIn] = useState(!isAuthenticated);
  const [toastMessage, setToastMessage] = useState({ message: "", type: "" }); // toast message
  useEffect(() => {
    setIsLoading(true);
    setIsLoggedIn(!isAuthenticated);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, [isAuthenticated]);

  return (
    <div className="overflow-hidden">
      <Layout
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        setShowStartPage={setShowStartPage}
        showStartPage={true}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={(value: boolean) => {
          if (!value) {
            dispatch(clearUser());
          }
        }}
      >
        <div className="h-full flex flex-col">
          {showStartPage ? (
            <StartPage
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
            />
          ) : (
            <ViewPanel
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
            />
          )}

          <PromptBar />
        </div>
      </Layout>
      <Toast
        showToast={showToast}
        toastMessage={toastMessage}
        onClose={() => {
          setShowToast(false);
          setToastMessage({ message: "", type: "" });
        }}
      />
    </div>
  );
};

export default HomePage;
