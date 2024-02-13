import mongoose from "mongoose";
import dotenv from "dotenv"


dotenv.config()

const mongo_uri = process.env.MONGO_URI
export const connectDB = async () => {
    try {
        await mongoose.connect(mongo_uri);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
    }
};
