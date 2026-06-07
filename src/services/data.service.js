const prisma = require("../config/prisma");

/* GET ALL */

const getAllDataAssets = async () => {

  return await prisma.dataAsset.findMany();

};

/* GET SINGLE */

const getDataAssetById = async (id) => {

  return await prisma.dataAsset.findUnique({

    where: {
      data_id: id
    }

  });

};

/* CREATE */

const createDataAsset = async (data) => {

  return await prisma.dataAsset.create({

    data: {

      ...data,

      data_start_date:
        data.data_start_date
          ? new Date(data.data_start_date)
          : null

    }

  });

};

/* UPDATE */

const updateDataAsset = async (
  id,
  data
) => {

  const existingAsset =
    await prisma.dataAsset.findUnique({

      where: {
        data_id: id
      }

    });

  if (!existingAsset) {

    throw new Error(
      `Data Asset ${id} not found`
    );

  }

  return await prisma.dataAsset.update({

    where: {
      data_id: id
    },

    data: {

      ...data,

      data_start_date:
        data.data_start_date
          ? new Date(data.data_start_date)
          : undefined

    }

  });

};

/* DELETE */

const deleteDataAsset = async (id) => {

  return await prisma.dataAsset.delete({

    where: {
      data_id: id
    }

  });

};

module.exports = {

  getAllDataAssets,
  getDataAssetById,
  createDataAsset,
  updateDataAsset,
  deleteDataAsset

};