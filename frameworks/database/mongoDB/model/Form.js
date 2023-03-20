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
    fields: [String],
    targets: [String],
    goal: String,
    responses: [mongoose.Schema.Types.Mixed],
    created_at: {
        type: 'Date',
        default: Date.now
    }
}, { strict: false });

// const example_data = {
//     id: 'asdasdasdasdd',
//     fields: ['name', 'address', 'hobby'],
//     goal: 'provide random data',
//     responses: [{
//         channel: 'telegram',
//         user_id: 38420,
//         chat_history: 'asdaskd asda sdasdasdasdasd asd asd asdasd',
//         status: 'pending',
//         data: {
//             name: 'zulkarnen',
//             address: 'jl ki ageng pemanahan',
//             hobby: 'membaca buku'
//         }
//     }]
// }
let Form = mongoose.model('form', formSchema);
// let newForm = new Form(example_data);
// newForm.save().then(r => console.log(r));

export default Form;
