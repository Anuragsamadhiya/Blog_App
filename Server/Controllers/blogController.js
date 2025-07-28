
import authModel from "../Models/authModel.js";
import blogModel from "../Models/blogModel.js";
import mongoose from "mongoose";
class blogController{
    static getallblog=async(req,res)=>{
try{
    const fetchallblog=await blogModel.find({user:req.user._id});
    return res.status(200).json(fetchallblog)
} catch(error){
    return res.status(200).json({message:error.message})

}
    }
     static getone = async (req, res) => {
    const paramId = req.params.id;
    const loggedInUserId = req.user._id; // Added from verifyuser middleware

    // Check if the param id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(paramId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Ensure logged-in user matches the param ID
    
    try {
      const user = await blogModel.findById(paramId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
   static addblog = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    // Basic validation
    if (!title || !description || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create and save blog
    const newblog = new blogModel({
      title,
      description,
      category,
      user: req.user._id
    });

    await newblog.save();
    console.log("Blog created:", newblog);

    return res.status(201).json({ message: "Blog added successfully", blog: newblog });
  } catch (error) {
    console.error("AddBlog Error:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

    
}
export default blogController;