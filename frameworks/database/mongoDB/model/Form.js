import mongoose from "mongoose";
// mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => {
    
// });
// id
// fields:[]
// goal:[]
// targets:[]
// responses: [
// {
// channel: "",
// user_id:"",
// data:{},
// chat_history:""
// status
// }
// ]
let formSchema = new mongoose.Schema({
    fields: {
        type: [String],
        required: true,
        validate: [(value) => value.length > 0, 'please fill fields minimal satu aja'],
    },
    is_active: {
        type: Boolean, 
        default: false
    },
    targets: [String],
    goal: {
        type: String,
        required: true
    },
    responses: [mongoose.Schema.Types.Mixed],
    created_at: {
        type: 'Date',
        default: Date.now
    },
    end_date: {
        type: 'Date',
    },
}, { strict: false });

let Form = mongoose.model('form', formSchema);


export default Form;
