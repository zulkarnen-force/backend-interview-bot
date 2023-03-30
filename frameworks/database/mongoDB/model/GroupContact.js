import mongoose from "mongoose";

let schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        
    },
    channel: {
        type: [String],
        validate: [(value) => value.length > 0, 'please fill fields minimal satu aja'],
    },
    contacts: {
        type: [ { name: String, telephone: String } ]
    },
    

}, { strict: true, timestamps: true});

let GroupContact = mongoose.model('groupContact', schema);


export default GroupContact;
