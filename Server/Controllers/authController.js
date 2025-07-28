import authModel from "../Models/authModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"; // ✅ Import JWT

const JWT_SECRET = "your_jwt_secret_key"; // 🔐 Should be stored in env file

class AuthController {
  static userRegistration = async (req, res) => {
    const { Username, email, password } = req.body;

    try {
      if (Username && email && password) {
        const iuser = await authModel.findOne({ email });

        if (!iuser) {
          const genSalt = await bcryptjs.genSalt(10);
          const hashedpassword = await bcryptjs.hash(password, genSalt);

          const newuser = new authModel({
            Username,
            email,
            password: hashedpassword,
          });

          const saveduser = await newuser.save();

          return res.status(201).json({ message: "User registration successful" });
        } else {
          return res.status(400).json({ message: "Email already exists" });
        }
      } else {
        return res.status(400).json({ message: "All fields are required" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  static userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
      if (email && password) {
        const user = await authModel.findOne({ email });

        if (user) {
          const isMatch = await bcryptjs.compare(password, user.password);

          if (isMatch) {
            const token = jwt.sign(
              { id: user._id },         // 👈 you can also add role, email, etc.
              JWT_SECRET,
              { expiresIn: "7d" }
            );

            return res.status(200).json({
              message: "Login successful",
              token: token,
              user: {
                id: user._id,
                Username: user.Username,
                email: user.email,
              }
            });
          } else {
            return res.status(401).json({ message: "Invalid credentials" });
          }
        } else {
          return res.status(404).json({ message: "User not found" });
        }
      } else {
        return res.status(400).json({ message: "Email and password are required" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}

export default AuthController;
