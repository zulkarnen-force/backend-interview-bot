import mongoose from 'mongoose';

var partisipantBotSchema = new mongoose.Schema({
    created_at: {
        type: 'Date',
        default: Date.now
    }
}, { strict: false });
var PartisipantBot = mongoose.model('partisipant_bot', partisipantBotSchema);

export default PartisipantBot;
