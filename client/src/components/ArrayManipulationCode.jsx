import CodeBlockTemplate from './CodeBlockTemplate';
import { arrayManipulation } from "../services/codeBlocksIns.js"; //importing the initial codeBlock
import "../styles/CodeBlock.css";

const title = arrayManipulation.title;
const solution = arrayManipulation.solution;
const initialCode = arrayManipulation.code;

const ArrayManipulationCode = () => {
  return <CodeBlockTemplate title={title} solution={solution} initialCode={initialCode} />;
};  

export default ArrayManipulationCode;
