import jwt from "jsonwebtoken";

const {
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    JWT_EXPIRATION,
    JWT_REFRESH_EXPIRATION
} = process.env;



// Generate JWT tokens
export const generateTokens = (user) => {
  const payload = { userId: user.id, email: user.email, roles: user.roles };
  const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: JWT_EXPIRATION });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRATION });
  return { accessToken, refreshToken };
};




// Create Access Token
export const generateAccessToken = (user) => {
  return jwt.sign({ userId: user.id, email: user.email, roles: user.roles }, JWT_ACCESS_SECRET, { expiresIn: JWT_EXPIRATION });
};

// Create Refresh Token
export const generateRefreshToken = (user) => {
  return jwt.sign({ userId: user.id, email: user.email, roles: user.roles }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRATION });
};

// Verify Token
export const verifyAccessToken = (token) => {
  return jwt.verify(token, JWT_ACCESS_SECRET);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, JWT_REFRESH_SECRET);
};
