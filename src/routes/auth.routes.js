const express = require("express");
const router  = express.Router();

const { register, login, getMe,checkUsername } = require("../controllers/auth.controller");
const { protect }= require("../middleware/auth.middleware");

/*PUBLIC ROUTES*/
router.post("/register", register);   
router.post("/login",    login);     
router.get("/check-username/:username",checkUsername);   
/*PROTECTED ROUTES*/
router.get("/me", protect, getMe);    

module.exports = router;