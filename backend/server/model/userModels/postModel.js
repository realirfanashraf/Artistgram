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
    createdAt: {
        type: Date,
        default: Date.now
    },
    isBlocked:{
        type :Boolean,
        default:false
    }
}, { timestamps: true });

const postModel = mongoose.model('Posts', postSchema);
export default postModel