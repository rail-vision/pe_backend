const jwt = require("jsonwebtoken");

const authService                  = require("../services/auth.service");
const { registerSchema, loginSchema } = require("../validations/auth.validation");

const JWT_SECRET     = process.env.JWT_SECRET     || "fallback_secret_change_this"
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d"

/*GENERATE JWT TOKEN*/
const generateToken = (user) => {
  return jwt.sign(
    {
      id:         user.id,
      email:      user.email,
      role:       user.role,
      department: user.department,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  )
}

/*REGISTER/POST /api/auth/register*/
const register = async (req, res) => {
  try {

    // Validate request body
    const validatedData = registerSchema.parse(req.body)

    // Create user
    const user = await authService.registerUser(validatedData)

    // Generate token
    const token = generateToken(user)

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: { user, token }
    })

  } catch (err) {
    console.error("[register]", err.message)

    // Zod validation error
    if (err.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: err.errors[0]?.message || "Validation failed",
        errors:  err.errors
      })
    }

    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Registration failed"
    })
  }
}

/*LOGIN/POST /api/auth/login*/
const login = async (req, res) => {
  try {

    // Validate request body
    const validatedData = loginSchema.parse(req.body)

    // Authenticate user
    const user = await authService.loginUser(validatedData)

    // Generate token
    const token = generateToken(user)

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { user, token }
    })

  } catch (err) {
    console.error("[login]", err.message)

    if (err.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: err.errors[0]?.message || "Validation failed",
        errors:  err.errors
      })
    }

    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Login failed"
    })
  }
}

/*GET ME (Protected)/GET /api/auth/me*/
const getMe = async (req, res) => {
  try {

    // req.user is set by auth middleware
    const user = await authService.getUserById(req.user.id)

    res.status(200).json({
      success: true,
      data: user
    })

  } catch (err) {
    console.error("[getMe]", err.message)
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Failed to fetch user"
    })
  }
}
/*CHECK USERNAME/GET /api/auth/check-username/:username*/
const checkUsername = async (req, res) => {
  try {
    const { username } = req.params

    if (!username || username.length < 3) {
      return res.status(400).json({
        success:   false,
        message:   "Username must be at least 3 characters",
        available: false
      })
    }

    const result = await authService.checkUsername(username)

    res.status(200).json({
      success:   true,
      available: result.available,
      message:   result.available
        ? "Username is available"
        : "Username is already taken"
    })

  } catch (err) {
    console.error("[checkUsername]", err.message)
    res.status(500).json({
      success:   false,
      message:   err.message,
      available: false
    })
  }
}

module.exports = { register, login, getMe ,checkUsername}