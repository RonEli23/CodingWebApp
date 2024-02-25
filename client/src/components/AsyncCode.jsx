import CodeBlockTemplate from './CodeBlockTemplate';
import { asyncFunction } from "../services/codeBlocksIns.js"; //importing the initial codeBlock
import "../styles/CodeBlock.css";

const title = asyncFunction.title;
const solution = asyncFunction.solution;
const initialCode = asyncFunction.code;

const CodeBlock = () => {
  return <CodeBlockTemplate title={title} solution={solution} initialCode={initialCode} />;
};

export default CodeBlock;
