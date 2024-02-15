import './App.css';
import { Routes, Route } from "react-router-dom";
import LobbyPage from './components/LobbyPage';
import ArrayManipulationCode from './components/ArrayManipulationCode';
import AsyncCode from './components/AsyncCode';
import BasicFunctionCode from './components/BasicFuncCode';
import JSONCode from './components/JSONCode';
import NoPage from './components/NoPage';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid'; // Import uuid package for generating unique keys


function App() {

  useEffect(() => {

    if(!Cookies.get("uniqueKey")){
      const newUniqueKey = uuidv4();
      console.log("Generated unique key:", newUniqueKey);
      Cookies.set("uniqueKey", JSON.stringify(newUniqueKey));
    }
    
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
