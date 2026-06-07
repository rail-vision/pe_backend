const prisma = require("../config/prisma");

const getAllInventory = async () => {

  return await prisma.inventory.findMany();

};

const getInventoryById = async (id) => {

  return await prisma.inventory.findUnique({
    where: {
      inventory_id: id
    }
  });

};

const createInventory = async (data) => {

  const existingItem =
    await prisma.inventory.findFirst({

      where: {
        item_number: data.item_number
      }

    });

  if (existingItem) {

    throw new Error(
      "Item Number already exists"
    );

  }

  return await prisma.inventory.create({
    data
  });

};

const updateInventory = async (
  id,
  data
) => {

  return await prisma.inventory.update({

    where: {
      inventory_id: id
    },

    data

  });

};

const deleteInventory = async (id) => {

  return await prisma.inventory.delete({

    where: {
      inventory_id: id
    }

  });

};

module.exports = {

  getAllInventory,
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory

};