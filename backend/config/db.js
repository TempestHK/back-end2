import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
        
    } catch (err) {
        console.error(`❌ Error in db: ${err.message}`);
        process.exit(1); // Stop the server if DB connection fails
    }
};

export default connectDB;
