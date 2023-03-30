import mongoose from "mongoose";

let formSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    fields: {
        type: [String],
        required: true,
        validate: [(value) => value.length > 0, 'please fill fields minimal satu aja'],
    },
    progress: {
        type: Number,
        default: 0
    },
    is_active: {
        type: Boolean, 
        default: false
    },
    targets: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GroupContact"
    },
    goal: {
        type: String,
        required: true
    },
    botId: String,
    responses: [mongoose.Schema.Types.Mixed],
    end_date: {
        type: 'Date',
    },
}, { strict: false, timestamps: true});

let Form = mongoose.model('Form', formSchema);


export default Form;
