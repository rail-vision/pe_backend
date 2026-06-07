const express = require("express");

const {

  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity

} = require(
  "../controller/activity.controller"
);

const router = express.Router();

router.get("/", getActivities);

router.get("/:id", getActivityById);

router.post("/", createActivity);

router.put("/:id", updateActivity);

router.delete("/:id", deleteActivity);

module.exports = router;