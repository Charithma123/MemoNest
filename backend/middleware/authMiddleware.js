const adminAuth = require("../utils/firebaseAdmin");
const AppError = require("../utils/appError");

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Not authenticated. Please log in.", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);   // ← changed from admin.auth().verifyIdToken(token)
    req.user = decodedToken;
    next();
  } catch (err) {
    return next(new AppError("Invalid or expired token. Please log in again.", 401));
  }
};

module.exports = protect;