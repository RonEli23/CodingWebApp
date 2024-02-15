import { useEffect, useState } from "react";
import axios from "../api/axios.js";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { JSONWork } from "../services/codeBlocksIns.js"; //importing the initial codeBlock
import "../styles/CodeBlock.css";
import socket from "../api/socket.js";
import Cookies from "js-cookie";



const title = JSONWork.title;
const SEND_CODE_URL = "/api/codeBlock";
const SET_UP_URL = `/api/SetComponentUp/${title}`;

const JSONCode = () => {
  const [code, setCode] = useState(JSONWork.code);
  const [isMentor, setIsMentor] = useState(false);
  const [isCodeCorrect, setIsCodeCorrect] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);

  //function to remove backdrop display
  const handleBackdropClick = (e) => {
    setShowBackdrop(false);
  };

  //function to remove indentation and spaces from the string code, so the comparison between solution and user solution will be in regards to the raw code
  const removeIndentation = (text) => {
    // Use a regular expression to match leading whitespace characters and replace them with an empty string
    return text.replace(/^\s+|\s+$/gm, "");
  };

  const solution = removeIndentation(JSONWork.solution);

  // handles the submit event
  const handleClick = async (e) => {
    e.preventDefault();
    const res = await axios.post(SEND_CODE_URL, { code: code, title: title });
    if (res.status === 200) {
      window.alert("the solution sent successfully");
    } else {
      window.alert("something went wrong");
    }
  };

  // handles the change event inside the textarea (user solution)
  const handleChange = (e) => {
    e.preventDefault();
    setHasChanged(true);
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

  // if user has changed the code, make sure he saved the changes before exiting
  useEffect(() => {
    if(!hasChanged) return;

    const handleBeforeUnload = (event) => {
      const userRes = window.confirm("Have you saved your changes?");
      if (!userRes) {
        event.preventDefault();
        return (event.returnValue = "");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload, {capture: true});

    //triggered when user exit component
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasChanged])

  useEffect(() => {
    //setting up component data from server
    axios
      .get(SET_UP_URL, {
        params: {
          title: title,
          uniqueKey: Cookies.get("uniqueKey"),
        },
      })
      .then((res) => {
        if (res.data.code) {
          setCode(res.data.code);
        }
        setIsMentor(res.data.isMentor);
      })
      .catch((err) => console.error(err));
    
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
      <button onClick={handleClick} disabled={isMentor}>save changes</button>
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
export default JSONCode;
