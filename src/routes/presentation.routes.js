const express =
require("express");

const {
  generatePPT
} =
require(
 "../controllers/presentation.controller"
);

const router =
express.Router();

router.post(
 "/ppt",
 generatePPT
);

module.exports =
router;