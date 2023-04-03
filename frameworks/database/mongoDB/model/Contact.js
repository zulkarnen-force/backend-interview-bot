import mongoose from "mongoose";

let schema = new mongoose.Schema({
    telephone: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    channel: {
        type: String,
        required: true,
    },
    is_valid: {
        type: Boolean,
        default: false,
    },
    created_at: {
        type: 'Date',
        default: Date.now
    },
    updated_at: {
        type: 'Date',
        default: Date.now
    },

}, { strict: false});

// schema.pre('findOneAndUpdate', function(next) {
//     this.updated_at = Date.now();
//     next();
//   });

let Contact = mongoose.model("Contact", schema);


export default Contact;
