const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_change_this"

/*
|--------------------------------------------------------------------------
| PROTECT MIDDLEWARE
| Verifies JWT token and attaches user to req.user
|--------------------------------------------------------------------------
*/
const protect = (req, res, next) => {

  // Get token from Authorization header
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided."
    })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded   // { id, email, role, department }
    next()
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again."
      })
    }
    return res.status(401).json({
      success: false,
      message: "Invalid token."
    })
  }
}

/*
|--------------------------------------------------------------------------
| ROLE GUARD MIDDLEWARE
| Usage: authorize("ADMIN") or authorize("ADMIN", "MANAGER")
|--------------------------------------------------------------------------
*/
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated"
      })
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${roles.join(" or ")}`
      })
    }
    next()
  }
}

module.exports = { protect, authorize }