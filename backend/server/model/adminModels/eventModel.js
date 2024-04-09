import mongoose from "mongoose";

const { Schema, model } = mongoose;

const eventSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isBlocked:{
        type:Boolean,
        default:false
    }
});

const Event = model('Event', eventSchema);

export default Event;
