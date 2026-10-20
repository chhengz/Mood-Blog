import { User } from "../models/index.js";
import { verifyAccessToken } from "../utils/jwt.utils.js";

// ===========================
// Authenticate middleware
// ===========================
export const authenticate = async (req, res, next) => {
  try {
    const token = getTokenFromHeader(req);
    const decoded = verifyAccessToken(token);

    if (!decoded) return res.status(401).json({ message: "Unauthorized: Invalid token" });

    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // attach full DB user to request
    // console.log(req.user);
    next();
  } catch (error) {
    // console.error("Auth error:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// ===========================
// Authorize middleware
// ===========================
export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roles.includes(req.user.roles)) {
      return res.status(403).json({ message: "Access denied: Insufficient permissions" });
    }

    next();
  };
};

// ===========================
// Helper: extract token
// ===========================
export const getTokenFromHeader = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized: No token provided");
  }
  return authHeader.split(" ")[1];
};
