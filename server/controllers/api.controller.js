import mongoose from "mongoose";
import { code_block_schema } from "../models/code_block.js";

// // Keep track of users in each code block
// const codeBlocks = [
//   { title: "Basic Function and Variable Declaration", mentor: "" },
//   { title: "Asynchronous Function", mentor: "" },
//   { title: "Working with JSON Data", mentor: "" },
//   { title: "Array Manipulation", mentor: "" },
// ];

const newCode_model = mongoose.model("newCode", code_block_schema);

export const handleSubmitCode = async (req, res) => {
  const { title, code } = req?.body;
  if (!title) return res.status(400).send();
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
        resultSave ? res.status(200).send() : res.status(500).send({ error: 'something blew up' });
      } else {
        let resultUpdate = await newCode_model.updateOne(
          { title: title },
          { code: code }
        );
        resultUpdate ? res.status(200).send() : res.status(500).send({ error: 'something blew up' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: 'something blew up' });
    }
  }
};

export const handleSetComponentUp = async (req, res) => {
  const { title ,uniqueKey} = req?.query;
  let isMentor = false;

  try {

    if (!title) return res.status(400).send({error:"block title is empty"});

    //mongo

    const query = newCode_model.find({ title: title });
    const result = await query.exec();
    if (result.length > 0) {
      let code = result[0].code;
      let mentor = result[0].mentor;
      if(mentor && mentor === uniqueKey){
        isMentor = true; 
      }
      if(!isMentor){
        let resultUpdate = await newCode_model.updateOne(
          { title: title },
          { mentor: mentor }
        );
      }
      res.status(200).json({ code: code, isMentor: isMentor });
    } else {
      res.status(200).json({ code: null, isMentor: isMentor });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: 'something blew up' });
  }
};
