const jwt = require("jsonwebtoken");

const authService = require("../services/auth.service");
const {
  registerSchema,
  loginSchema
} = require("../validations/auth.validation");

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "fallback_secret_change_this";

const JWT_EXPIRES_IN =
  process.env.JWT_EXPIRES_IN ||
  "7d";

/*Generate JWT*/
const generateToken = (user) => {

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      department: user.department
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN
    }
  );

};

/*Register/POST /api/auth/register*/
const register = async (req, res, next) => {

  try {

    const validatedData =
      registerSchema.parse(req.body);

    const user =
      await authService.registerUser(validatedData);

    const token =
      generateToken(user);

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        user,
        token
      }
    });

  } catch (err) {

    if (err.name === "ZodError") {

      return res.status(400).json({
        success: false,
        message:
          err.issues[0]?.message ||
          "Validation failed",
        errors: err.issues
      });

    }

    next(err);

  }

};

/*Login/POST /api/auth/login*/
const login = async (req, res, next) => {

  try {

    const validatedData =
      loginSchema.parse(req.body);

    const user =
      await authService.loginUser(validatedData);

    const token =
      generateToken(user);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user,
        token
      }
    });

  } catch (err) {

    if (err.name === "ZodError") {

      return res.status(400).json({
        success: false,
        message:
          err.issues[0]?.message ||
          "Validation failed",
        errors: err.issues
      });

    }

    next(err);

  }

};

/*Get Current User|GET /api/auth/me*/
const getMe = async (req, res, next) => {

  try {

    const user =
      await authService.getUserById(req.user.id);

    return res.status(200).json({
      success: true,
      data: user
    });

  } catch (err) {

    next(err);

  }

};

/*Check Username|GET /api/auth/check-username/:username*/
const checkUsername = async (req, res, next) => {

  try {

    const { username } = req.params;

    if (!username || username.length < 3) {

      return res.status(400).json({
        success: false,
        message:
          "Username must be at least 3 characters",
        available: false
      });

    }

    const result =
      await authService.checkUsername(username);

    return res.status(200).json({
      success: true,
      available: result.available,
      message: result.available
        ? "Username is available"
        : "Username is already taken"
    });

  } catch (err) {

    next(err);

  }

};

module.exports = {
  register,
  login,
  getMe,
  checkUsername
};