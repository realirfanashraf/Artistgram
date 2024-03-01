import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rating: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        value: {
            type: Number,
            min: 0,
            max: 5
        }
    }]
}, { timestamps: true });

export const postModel = mongoose.model('Posts', postSchema);
