import mongoose from "mongoose";
import { code_block_schema } from "../models/code_block.js";

const newCode_model = mongoose.model("newCode", code_block_schema);

export const handleSubmitCode = async (req, res) => {
  const { title, code } = req?.body;
  if (!title) return res.status(400).send();
  else {
    try {
      let resultFind = await newCode_model.findOne({ title });
      if (!resultFind) {
        res.status(400).send({ error: 'something went wrong' });
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

    const result = newCode_model.findOne({ title: title });
    console.log(result);
    if (result) {
      let code = result.code;
      let mentor = result.mentor;
      if(mentor && mentor === uniqueKey){
        isMentor = true; 
      }
      console.log("hi");
      res.status(200).json({ code: code, isMentor: isMentor });
    } else {
      console.log("hi2");
      const newCode = new newCode_model({title: title, code:"", mentor: uniqueKey});
      let resultSave = await newCode.save({title: title, code:"", mentor: uniqueKey});
      isMentor = true; 
      console.log(resultSave);
      resultSave ? res.status(200).json({ code: null, isMentor: isMentor }) : res.status(500).send({ error: 'something blew up' });;
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: 'something blew up' });
  }
};
