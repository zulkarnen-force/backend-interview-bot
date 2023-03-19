import mongoose from "mongoose";
// mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => {
    
// });
let formSchema = new mongoose.Schema({
    fields: [String],
    data: [mongoose.Schema.Types.Mixed],
    channel: String,
    history: String,
    status: String,
    created_at: {
        type: 'Date',
        default: Date.now
    }
}, { strict: false });

let Form = mongoose.model('form', formSchema);

export default Form;
