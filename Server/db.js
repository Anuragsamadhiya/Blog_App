import mongoose from "mongoose";

const connectToMongo = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/Practice_mern", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectToMongo;
