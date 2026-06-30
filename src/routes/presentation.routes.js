const express = require("express");

console.log("Presentation Routes Loaded");


const router = express.Router();

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Presentation route works"
    });
});

module.exports = router;