import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./components/pages/HomePage";
import SignUpPage from "./components/sections/SignUpPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
