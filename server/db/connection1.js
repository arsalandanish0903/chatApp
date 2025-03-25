import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI;
        const instance = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connected: ${instance.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}