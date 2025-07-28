import mongoose from "mongoose";
const blogSchema=new mongoose.Schema({
    title:{
        type:String,
    },
    category:{
        // type:mongoose.Schema.Types.ObjectId,
        // refer:"categories",
                type:String,

    },
    description:{
        type:String,
    },
    
    user:{
        type:mongoose.Schema.Types.ObjectId,
        refer:"users"
    },
});
const blogModel=mongoose.model("blogs",blogSchema)
export default blogModel;