import "./App.css";
import { Routes, Route } from "react-router-dom";
import LobbyPage from "./components/LobbyPage";
import ArrayManipulationCode from "./components/ArrayManipulationCode";
import AsyncCode from "./components/AsyncCode";
import BasicFunctionCode from "./components/BasicFuncCode";
import JSONCode from "./components/JSONCode";
import NoPage from "./components/NoPage";
import { useEffect } from "react";
import Cookies from "js-cookie";


function App() {
  // create/get cookie at the first render of the app
  useEffect(() => {
    if (!Cookies.get("uniqueKey")) {
      const newUniqueKey = crypto.randomUUID();

      const domain = process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_COOKIE_DOMAIN_PROD
        : process.env.REACT_APP_COOKIE_DOMAIN_DEV;

      // Set expiration date
      let expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30); // This sets the expiration date 30 days from now

      Cookies.set("uniqueKey", JSON.stringify(newUniqueKey), {
        expires: expirationDate,
        // secure: true,
        // sameSite: 'Lax',
        // domain: domain,
        // path: '/', // Set the path to root so it's sent with all requests
      }); 
    }

  }, []);

  return (
    <div className="App">
      <Routes>
        <Route index element={<LobbyPage />} />
        <Route path="/AsyncCode" element={<AsyncCode />} />
        <Route path="/ArrayManipulation" element={<ArrayManipulationCode />} />
        <Route path="/BasicFunction" element={<BasicFunctionCode />} />
        <Route path="/JSONCode" element={<JSONCode />} />
        <Route path="*" exact element={<NoPage />} />
      </Routes>
    </div>
  );
}

export default App;
