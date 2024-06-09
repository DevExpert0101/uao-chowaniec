import mongoose from "mongoose";

const connectDB = async (connectionString: string) => {
  try {
    await mongoose.connect(connectionString);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
