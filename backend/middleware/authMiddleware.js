import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwtConfig.js";

export const requireAuth = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth)
    return res.status(401).json({ error: "Falta token" });

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ error: "Token inválido" });
  }
};
