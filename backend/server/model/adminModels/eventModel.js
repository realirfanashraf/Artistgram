import mongoose from "mongoose";

const { Schema, model } = mongoose;

const eventSchema = new Schema({
    image:{
        type:String,
        required:true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        default: () => Date.now() + 2 * 24 * 60 * 60 * 1000 // Set expiration date 2 days from now
    }
});

const eventModel = model('Event', eventSchema);

export default eventModel;
