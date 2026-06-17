const express = require("express");
const router  = express.Router();

const { getDashboardStats }  = require("../controllers/dashboard.controller");
const { protect }            = require("../middleware/auth.middleware");

/*DASHBOARD ROUTES/All protected — user must be logged in*/
router.get("/stats", protect, getDashboardStats);   

module.exports = router;