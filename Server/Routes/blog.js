import express from 'express';
import AuthController from '../Controllers/authController.js';
import blogController from '../Controllers/blogController.js';
import categorycontrollers from '../Controllers/CategoryControllers.js';
import verifyuser from '../Middlewares/verifytoken.js';
const router = express.Router();
import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); // folder to save files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // rename file
  }
});
const upload = multer({ storage: storage });
// Use class methods from AuthController
router.post("/user/register", AuthController.userRegistration);
router.post("/user/login", AuthController.userLogin);

router.get("/blog/getall",verifyuser, blogController.getallblog);
router.get("/blog/getone/:id",verifyuser, blogController.getone);
router.post("/blog/addblog",verifyuser,blogController.addblog);

router.get("/get/categories",verifyuser,categorycontrollers.getall);
router.post("/add/category",verifyuser,categorycontrollers.addcategory);


export default router;
