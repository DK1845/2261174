import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Stats from "./Stats";
import Redirector from "./Redirector";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/:shortcode" element={<Redirector />} />
    </Routes>
  );
};

export default App;