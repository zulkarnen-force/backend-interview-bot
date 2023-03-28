import mongoose from "mongoose";

let schema = new mongoose.Schema({
    title: {
        type: String,
    },
    channel: {
        type: String
    },
    contacts: {
        type: [ { name: String, telephone: String } ]
    },
    created_at: {
        type: 'Date',
        default: Date.now
    },
    updated_at: {
        type: 'Date',
        default: Date.now
    },

}, { strict: true});

let GroupContact = mongoose.model('groupContact', schema);


export default GroupContact;
