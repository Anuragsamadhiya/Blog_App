import mongoose from "mongoose";

// Define the schema
const authSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true }); // optional: adds createdAt and updatedAt fields

// Create the model
const authModel = mongoose.model("User", authSchema);

// Export the model
export default authModel;
