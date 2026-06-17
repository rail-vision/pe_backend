const { z } = require("zod");

/*
|--------------------------------------------------------------------------
| REGISTER SCHEMA
|--------------------------------------------------------------------------
*/
const registerSchema = z.object({
  firstName:   z.string().min(1, "First name is required"),
  lastName:    z.string().min(1, "Last name is required"),
  email:       z.string().email("Invalid email address"),
  password:    z.string().min(8, "Password must be at least 8 characters"),
  role:        z.enum(["ADMIN", "MANAGER", "VIEWER"]).optional().default("VIEWER"),
  department:  z.string().optional().default("general"),
});

/*
|--------------------------------------------------------------------------
| LOGIN SCHEMA
|--------------------------------------------------------------------------
*/
const loginSchema = z.object({
  email:    z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

module.exports = { registerSchema, loginSchema };