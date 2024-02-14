import mongoose from "mongoose";
import { code_block_schema } from "../models/code_block.js";

// Keep track of users in each code block
let firstConnection = true;

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
  const {title} = req?.query;
  if (!title) res.send();
  let isMentor = false;

  if (firstConnection) {
    firstConnection = false;
    isMentor = true;
  }
  try {
    //mongo
    const query = newCode_model.find({ title: title });
    const result = await query.exec();
    if (result.length > 0) {
      let code = result[0].code;
      res.json({ code: code, isMentor: isMentor });
    } else {
      res.json({ code: null, isMentor: isMentor });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
