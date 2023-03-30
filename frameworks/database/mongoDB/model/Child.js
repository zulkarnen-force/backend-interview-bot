import mongoose from "mongoose";

let schema = new mongoose.Schema({
    child_name: String,
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parent"
    }
});

let Child = mongoose.model('Child', schema);

export default Child;
