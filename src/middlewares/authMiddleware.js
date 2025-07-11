import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/token.js";
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("AuthHeader:", authHeader); 

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No autorizado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.log("Token inválido", error.message); 
    return res.status(401).json({ message: "Token inválido" });
  }
};

export default authMiddleware;

