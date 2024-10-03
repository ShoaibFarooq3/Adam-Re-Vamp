import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Model } from "./state/model";
import { RootState } from "./store";
import { clearUser } from "./redux/slices/authSlice";

import SignUpPage from "./components/sections/SignUpPage";
import { State, StatePersister } from "./state/app-state";
import Layout from "./components/Layout/Layout";
import ViewPanel from "./components/sections/ViewPanel";
import StartPage from "./components/sections/StartPage";

import "./App.css";
import { FSContext, ModelContext } from "./components/contexts";
interface AppProps {
  initialState: State;
  statePersister: StatePersister;
  fs: FS;
}
function App({ initialState, statePersister, fs }: AppProps) {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const model = new Model(fs, state, setState, statePersister);

  const { isAuthenticated } = useSelector((userState: RootState) => ({
    isAuthenticated: userState?.auth?.isAuthenticated,
  }));
  const [showFilter, setShowFilter] = useState(false);
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

  useEffect(() => model.init());

  return (
    <ModelContext.Provider value={model}>
      <FSContext.Provider value={fs}>
        <Router>
          <Layout
            setShowFilter={setShowFilter}
            showFilter={showFilter}
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
            <Routes>
              <Route
                path="/"
                element={
                  <StartPage
                    showSidebar={showSidebar}
                    setShowSidebar={setShowSidebar}
                  />
                }
              />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route
                path={`/:id`}
                element={
                  <ViewPanel
                    showSidebar={showSidebar}
                    setShowSidebar={setShowSidebar}
                    setShowFilter={setShowFilter}
                    showFilter={!showFilter}
                  />
                }
              />
              <Route
                path="/view-panel"
                element={
                  <ViewPanel
                    showSidebar={showSidebar}
                    setShowSidebar={setShowSidebar}
                    setShowFilter={setShowFilter}
                    showFilter={!showFilter}
                  />
                }
              />
            </Routes>
          </Layout>
        </Router>
      </FSContext.Provider>
    </ModelContext.Provider>
  );
}

export default App;
