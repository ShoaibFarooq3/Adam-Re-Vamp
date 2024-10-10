import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// context
import { ModelContext, FSContext } from "./contexts";

// state
import { Model } from "../state/model";
// components
import { AppProps } from "../utils/interfaces";
import LandingPage from "./pages/LandingPage";
import MainPage from "./pages/MainPage";
import Layout from "./Layout/Layout";
import SignUpPage from "./sections/SignUpPage";
import ViewerPanel from "./sections/ViewerPanel";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { clearUser } from "../redux/slices/authSlice";

// ---------------------------------------------------------

// ---------------------------------------------------------

export function App({ initialState, statePersister, fs }: AppProps) {
  // --------------------------

  const [state, setState] = useState(initialState);
  const model = new Model(fs, state, setState, statePersister);

  const [showSidebar, setShowSidebar] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const { isAuthenticated } = useSelector((userState: RootState) => ({
    isAuthenticated: userState?.auth?.isAuthenticated,
  }));
  const [isLoading, setIsLoading] = useState(false);
  const [showStartPage, setShowStartPage] = useState(true);
  const [showToast, setShowToast] = useState<boolean>(false); // display toast
  const [isLoggedIn, setIsLoggedIn] = useState(!isAuthenticated);

  useEffect(() => model.init());

  return (
    <ModelContext.Provider value={model}>
      <FSContext.Provider value={fs}>
        <BrowserRouter>
          <Layout
            showSidebar={showSidebar}
            setShowFilter={setShowFilter}
            showFilter={showFilter}
            setShowSidebar={setShowSidebar}
            setShowStartPage={setShowStartPage}
            showStartPage={showStartPage}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={(value: boolean) => {
              // if (!value) {
              //   dispatchEvent(clearUser());
              // }
            }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <LandingPage
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    showSidebar={showSidebar}
                    setShowSidebar={setShowSidebar}
                    setShowFilter={setShowFilter}
                    showFilter={!showFilter}
                    setShowStartPage={setShowStartPage}
                    showStartPage={showStartPage}
                  />
                }
              />
              <Route
                path={`/:id`}
                element={
                  <ViewerPanel
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    showSidebar={showSidebar}
                    setShowSidebar={setShowSidebar}
                    setShowFilter={setShowFilter}
                    showFilter={!showFilter}
                    setShowStartPage={setShowStartPage}
                    showStartPage={showStartPage}
                  />
                }
              />
              <Route path="/sign-up" element={<SignUpPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </FSContext.Provider>
    </ModelContext.Provider>
  );
}
