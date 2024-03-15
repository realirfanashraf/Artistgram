import mongoose from "mongoose";

const { Schema, model } = mongoose;

const reportSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Posts',
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const Report = model('Report', reportSchema);

export default Report;
