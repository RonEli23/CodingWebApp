import io from "socket.io-client";
import { useEffect, useState } from "react";
import axios from '../api/axios.js';

const IS_MENTOR_URL = 'api/isMentorStatus';

const socket = io.connect("http://localhost:8080");


const CodeBlock = (props) => {
  const [code, setCode] = useState("");
  const [isMentor, setIsMentor] = useState(false);
  const  id  = 1;

  const handleClick = () => {
    socket.emit("code_submit",  code );
  };

  const handleChange = (e) => {
    e.preventDefault();
    setCode(e.target.value);
    socket.emit("code_change",  code );
  };

  useEffect(() => {
    // Check if there are any other users accessing the same code block
    console.log("Checking")
    axios.get(IS_MENTOR_URL)
        .then((res)=>setIsMentor(res.data))
        .catch((err) =>console.error(err))
    console.log(isMentor)
}, [])

  useEffect(() => {
     
    // Listen for changes in code
    socket.on("received_data", (newCode) => {
      setCode(newCode);
    });

  }, [socket]);

  return (
    <section>
      <input placeholder="code" onChange={handleChange} readOnly={isMentor}></input>
      <button onClick={handleClick}>send</button>
      <p>{code}</p>
    </section>
  );
};
export default CodeBlock;
