const prisma = require("../config/prisma");

/* GET ALL */

const getAllActivities = async () => {

  return await prisma.activity.findMany();

};

/* GET SINGLE */

const getActivityById = async (id) => {

  return await prisma.activity.findUnique({

    where: {
      activity_id: id
    }

  });

};

/* CREATE */

const createActivity = async (data) => {

  return await prisma.activity.create({

    data: {

      ...data,

      start_date:
        data.start_date
          ? new Date(data.start_date)
          : null,

      target_completion_date:
        data.target_completion_date
          ? new Date(data.target_completion_date)
          : null,

      actual_completion_date:
        data.actual_completion_date
          ? new Date(data.actual_completion_date)
          : null

    }

  });

};

/* UPDATE */

const updateActivity = async (
  id,
  data
) => {

  const activity =
    await prisma.activity.findUnique({

      where: {
        activity_id: id
      }

    });

  if (!activity) {

    throw new Error(
      `Activity ${id} not found`
    );

  }

  return await prisma.activity.update({

    where: {
      activity_id: id
    },

    data: {

      ...data,

      start_date:
        data.start_date
          ? new Date(data.start_date)
          : undefined,

      target_completion_date:
        data.target_completion_date
          ? new Date(data.target_completion_date)
          : undefined,

      actual_completion_date:
        data.actual_completion_date
          ? new Date(data.actual_completion_date)
          : undefined

    }

  });

};

/* DELETE */

const deleteActivity = async (id) => {

  return await prisma.activity.delete({

    where: {
      activity_id: id
    }

  });

};

module.exports = {

  getAllActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity

};