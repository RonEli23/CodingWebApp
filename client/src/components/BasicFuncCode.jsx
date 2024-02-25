import CodeBlockTemplate from './CodeBlockTemplate';
import { basicFunction } from "../services/codeBlocksIns.js"; //importing the initial codeBlock
import "../styles/CodeBlock.css";

const title = basicFunction.title;
const solution = basicFunction.solution;
const initialCode = basicFunction.code;

const BasicFunctionCode = () => {
  return <CodeBlockTemplate title={title} solution={solution} initialCode={initialCode} />;
};

export default BasicFunctionCode;
