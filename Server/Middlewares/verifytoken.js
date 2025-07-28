import jwt from "jsonwebtoken";
import authModel from "../Models/authModel.js";

const verifyuser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
const JWT_SECRET = "your_jwt_secret_key";
  // Check if token exists and follows Bearer format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Fetch user from DB using decoded ID
    const user = await authModel.findById(decoded.id).select("-password"); // remove password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach user to request
    next(); // Proceed to next middleware/route
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default verifyuser;
