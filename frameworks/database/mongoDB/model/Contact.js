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
        required: true
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

let Contact = mongoose.model('contact', schema);


export default Contact;
