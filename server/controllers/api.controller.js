import mongoose from "mongoose";
import { code_block_schema } from "../models/code_block.js";

// Keep track of users in each code block
const codeBlocks = [
  { title: "Basic Function and Variable Declaration", isMentor: true },
  { title: "Asynchronous Function", isMentor: true },
  { title: "Working with JSON Data", isMentor: true },
  { title: "Array Manipulation", isMentor: true },
];

const newCode_model = mongoose.model("newCode", code_block_schema);

export const handleSubmitCode = async (req, res) => {
  const { title, code } = req?.body;
  if (!title) res.sendStatus(400);
  else {
    let obj = {
      title: title,
      code: code,
    };

    try {
      let resultFind = await newCode_model.findOne({ title });
      if (!resultFind) {
        const newCode = new newCode_model(obj);
        let resultSave = await newCode.save(obj);
        resultSave ? res.sendStatus(200) : res.sendStatus(400);
      } else {
        let resultUpdate = await newCode_model.updateOne(
          { title: title },
          { code: code }
        );
        resultUpdate ? res.sendStatus(200) : res.sendStatus(400);
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  }
};

export const handleSetComponentUp = async (req, res) => {
  const { title } = req?.query;
  console.log(title);
  if (!title) res.sendStatus(400);
  let isMentor = false;

  // Find the code block with the given title
  const codeBlock = codeBlocks.find((block) => block.title === title);

  // If the code block is found, update its isMentor value
  if (codeBlock.isMentor) {
    codeBlock.isMentor = false;
    isMentor = true;
  }
  console.log(isMentor);
  console.log(codeBlocks);
  try {
    //mongo
    const query = newCode_model.find({ title: title });
    const result = await query.exec();
    if (result.length > 0) {
      let code = result[0].code;
      console.log(isMentor);
      res.json({ code: code, isMentor: isMentor });
    } else {
      console.log(isMentor);
      res.json({ code: null, isMentor: isMentor });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
