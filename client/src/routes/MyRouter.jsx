import { useState, useContext, forwardRef, useEffect } from "react";
// import react-router-dom
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { LobbyPage } from "../components/LobbyPage";
import NoPage from "../components/NoPage";

const MyRouter = () => {
  <Router>
    <Routes>
      <Route path="/" exact element={<LobbyPage />}/>
      <Route path="/" exact element={<LobbyPage />}/>
      <Route path="/" exact element={<LobbyPage />}/>
      <Route path="/" exact element={<LobbyPage />}/>
      <Route path="*" exact element={<NoPage />} />
    </Routes>
  </Router>;
};

export default MyRouter;
