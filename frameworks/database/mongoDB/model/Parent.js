import mongoose from "mongoose";

let schema = new mongoose.Schema({
    parent_name: String,
});

let Parent = mongoose.model('Parent', schema);

export default Parent;
