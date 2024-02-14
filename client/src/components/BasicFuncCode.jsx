import { useEffect, useState } from "react";
import axios from "../api/axios.js";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { basicFunction } from "../services/codeBlocksIns.js"; //importing the initial codeBlock
import "../styles/CodeBlock.css";
import socket from "../api/socket.js";


const title = basicFunction.title;
console.log(title);
const SEND_CODE_URL = "/api/codeBlock";
const SET_UP_URL = `/api/SetComponentUp/${title}`;

const BasicFunctionCode = () => {
  const [code, setCode] = useState(basicFunction.code);
  const [isMentor, setIsMentor] = useState(false);
  const [message, setMessage] = useState("");
  const [isCodeCorrect, setIsCodeCorrect] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);

  //function to remove backdrop display
  const handleBackdropClick = (e) => {
    setShowBackdrop(false);
  };

  //function to remove indentation and spaces from the string code, so the comparison between solution and user solution will be in regards to the raw code
  const removeIndentation = (text) => {
    // Use a regular expression to match leading whitespace characters and replace them with an empty string
    return text.replace(/^\s+|\s+$/gm, "");
  };

  const solution = removeIndentation(basicFunction.solution);

  // handles the submit event
  const handleClick = async (e) => {
    e.preventDefault();
    const res = await axios.post(SEND_CODE_URL, { code: code, title: title });
    console.log(res);
    if (res.status === 200) {
      setMessage("the solution sent successfully");
    } else {
      setMessage("something went wrong");
    }
  };

  // handles the change event inside the textarea (user solution)
  const handleChange = (e) => {
    e.preventDefault();
    setCode(e.target.value);
    socket.emit("code_change", e.target.value);
    let newCode = removeIndentation(e.target.value);
    if (newCode === solution) {
      setIsCodeCorrect(true);
      setShowBackdrop(true);
    } else {
      setIsCodeCorrect(false);
    }
  };

  useEffect(() => {
    //setting up component data from server
    axios
      .get(SET_UP_URL, {
        params: {
          title: title,
        },
      })
      .then((res) => {
        if (res.data.code) {
          setCode(res.data.code);
        }
        setIsMentor(res.data.isMentor);
      })
      .catch((err) => console.error(err));
    
    // this function will be called when user wants to exit component
    const handleBeforeUnload = (event) => {
      const userRes = window.confirm("Have you saved your changes?");
      if (!userRes) {
        event.preventDefault();
        event.returnValue = ""; // For older browsers
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    //triggered when user exit component
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    // Listen for changes in code
    socket.on("received_data", (newCode) => {
      setCode(newCode);
    });
  }, [socket]);

  return (
    <section className="container">
      <h1 className="code-block-title">{title}</h1>
      <textarea
        value={code}
        onChange={handleChange}
        rows={10}
        cols={50}
        readOnly={isMentor}
      />
      <SyntaxHighlighter
        language="javascript"
        style={atomOneDark}
        className="code-block"
      >
        {code}
      </SyntaxHighlighter>
      <button onClick={handleClick}>save changes</button>
      <p>{message}</p>
      {isCodeCorrect && showBackdrop ? (
        <div>
          <div className="backdrop" onClick={handleBackdropClick} />
          <div className="smiley" onClick={handleBackdropClick}>
            😊
          </div>
        </div>
      ) : null}
    </section>
  );
};
export default BasicFunctionCode;
