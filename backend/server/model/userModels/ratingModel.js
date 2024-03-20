import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
    PostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts',
        required: true
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Value: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }
});

const ratingModel = mongoose.model('Rating', ratingSchema);

export default ratingModel;
