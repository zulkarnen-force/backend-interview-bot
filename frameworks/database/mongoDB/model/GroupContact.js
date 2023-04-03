import mongoose from "mongoose";

let groupContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    channel: {
        type: [String],
        validate: [(value) => value.length > 0, 'please fill fields minimal satu aja'],
    },
    contacts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Contact"
    },
}, { strict: false, timestamps: true});

let GroupContact = mongoose.model('GroupContact', groupContactSchema);


export default GroupContact;
