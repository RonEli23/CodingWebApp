import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LobbyPage from './components/LobbyPage';
import ArrayManipulationCode from './components/ArrayManipulationCode';
import AsyncCode from './components/AsyncCode';
import BasicFunctionCode from './components/BasicFuncCode';
import JSONCode from './components/JSONCode';
import NoPage from './components/NoPage';
import { useEffect } from 'react';
import socket from "./api/socket.js";


function App() {

  useEffect(() => {

    //triggered when user exit component
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route index element={<LobbyPage />}/>
        <Route path="/AsyncCode" element={<AsyncCode />}/>
        <Route path="/ArrayManipulation" element={<ArrayManipulationCode />}/>
        <Route path="/BasicFunction" element={<BasicFunctionCode />}/>
        <Route path="/JSONCode" element={<JSONCode />}/>
        <Route path="*" exact element={<NoPage />} />
      </Routes>
    </div>
  );
}

export default App;
