import categoryModel from "../Models/CategoryModel.js";
class categorycontrollers{
    static getall=async(req,res)=>{
try{
    const fetchall=await categoryModel.find({});
    return res.status(200).json(fetchall)
} catch(error){
    return res.status(200).json({message:error.message})

}
    };

    static addcategory=async(req,res)=>{
const{title}=req.body;
try{
    if(title){
const newcategor= new categoryModel({
    title,
});
const saved= await newcategor.save();
return res.status (200).json({message:"Category added succesfully"})
    }else{
        res.status (400).json({message:"all fileds are required"})
    }
} catch(error){
     res.status (400).json({message:error.message})
}
    };
}
export default categorycontrollers;