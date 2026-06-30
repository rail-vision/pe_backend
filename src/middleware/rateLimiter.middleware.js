const { rateLimit, ipKeyGenerator } = require("express-rate-limit");

/*
|--------------------------------------------------------------------------
| GENERAL API LIMITER
| Applies to all /api routes — prevents general abuse
|--------------------------------------------------------------------------
*/
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes
  max:      200,               // 200 requests per IP per window
  standardHeaders: true,
  legacyHeaders:   false,
  keyGenerator: (req) => ipKeyGenerator(req.ip), // ✅ v8-safe IPv6 handling
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
});

/*
|--------------------------------------------------------------------------
| AUTH LIMITER — STRICT
| Applies to /api/auth/login and /api/auth/register
| Prevents brute-force password attacks
|--------------------------------------------------------------------------
*/
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes
  max:      10,                // only 10 attempts per IP per window
  standardHeaders: true,
  legacyHeaders:   false,
  skipSuccessfulRequests: true,
  keyGenerator: (req) => ipKeyGenerator(req.ip), // ✅ v8-safe IPv6 handling
  message: {
    success: false,
    message: "Too many login attempts. Please try again in 15 minutes."
  }
});

/*
|--------------------------------------------------------------------------
| UPLOAD LIMITER — MODERATE
| Applies to /api/upload/*
|--------------------------------------------------------------------------
*/
const uploadLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,   // 10 minutes
  max:      20,                // 20 uploads per IP per window
  standardHeaders: true,
  legacyHeaders:   false,
  keyGenerator: (req) => ipKeyGenerator(req.ip), // ✅ v8-safe IPv6 handling
  message: {
    success: false,
    message: "Too many upload requests. Please wait before uploading again."
  }
});

module.exports = { generalLimiter, authLimiter, uploadLimiter };