import mongoose from 'mongoose';

export const code_block_schema = new mongoose.Schema({
    title: String,
    code: String,
})