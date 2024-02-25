import CodeBlockTemplate from './CodeBlockTemplate';
import { JSONWork } from "../services/codeBlocksIns.js"; //importing the initial codeBlock
import "../styles/CodeBlock.css";

const title = JSONWork.title;
const solution = JSONWork.solution;
const initialCode = JSONWork.code;


const JSONCode = () => {
  return <CodeBlockTemplate title={title} solution={solution} initialCode={initialCode} />;
};

export default JSONCode;
