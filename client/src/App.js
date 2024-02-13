import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LobbyPage from './components/LobbyPage';
import CodeBlock from './components/CodeBlock';
import NoPage from './components/NoPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<LobbyPage />}/>
        <Route path="/CodeBlock" element={<CodeBlock />}/>
        <Route path="*" exact element={<NoPage />} />
      </Routes>
    </div>
  );
}

export default App;
