import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
    followerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
      },
      followingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
      }
});

const followModel = mongoose.model('Follow', followSchema);
export default followModel