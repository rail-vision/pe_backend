const activityService =
require("../services/activity.service");

const activitySchema =
require("../validations/activity.validation");

const getActivities = async (req, res) => {

  try {

    const activities =
      await activityService.getAllActivities();

    return res.status(200).json({
      success: true,
      data: activities
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const getActivityById = async (req, res) => {

  try {

    const activity =
      await activityService.getActivityById(
        req.params.id
      );

    if (!activity) {

      return res.status(404).json({
        success: false,
        message: "Activity not found"
      });

    }

    return res.status(200).json({
      success: true,
      data: activity
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const createActivity = async (req, res) => {

  try {

    activitySchema.parse(req.body);

    const activity =
      await activityService.createActivity(
        req.body
      );

    return res.status(201).json({
      success: true,
      data: activity
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

const updateActivity = async (req, res) => {

  try {

    activitySchema
      .partial()
      .parse(req.body);

    const activity =
      await activityService.updateActivity(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      data: activity
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

const deleteActivity = async (req, res) => {

  try {

    await activityService.deleteActivity(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Activity deleted successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {

  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity

};