import mongoose from 'mongoose';

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;
const ParticipantSchema = new Schema({
    id: {
        type: String,
        unique: true
    },
    name: {
        type: String,
    },
    hobby: String,
    createdAt: {
        type: 'Date',
        default: Date.now
    }
});

// PostsSchema.index({ userId: 1, title: 1 });
// PostsSchema.index({ userId: 1, description: 1 });
// PostsSchema.index({ userId: 1, createdAt: 1 });
// PostsSchema.index({ userId: 1, isPublished: 1 });

const ParticipantModel = mongoose.model('Participant', ParticipantSchema);

// PostModel.ensureIndexes((err) => {
//   if (err) {
//     return err;
//   }
//   return true;
// });

export default ParticipantModel;
