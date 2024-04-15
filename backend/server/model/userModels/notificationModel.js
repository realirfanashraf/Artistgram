import mongoose from "mongoose";

const { Schema, model } = mongoose;

const notificationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  }
});

const Notification = model("Notification", notificationSchema);
module.exports = Notification;
