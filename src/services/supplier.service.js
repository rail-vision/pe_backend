const prisma = require("../config/prisma");

/* GET ALL */

const getAllSuppliers = async () => {

  return await prisma.supplier.findMany();

};

/* GET SINGLE */

const getSupplierById = async (id) => {

  return await prisma.supplier.findUnique({

    where: {
      supplier_id: id
    }

  });

};

/* CREATE */

const createSupplier = async (data) => {

  if (data.supplier_code) {

    const existingCode =
      await prisma.supplier.findUnique({

        where: {
          supplier_code:
          data.supplier_code
        }

      });

    if (existingCode) {

      throw new Error(
        "Supplier Code already exists"
      );

    }

  }

  if (data.supplier_email) {

    const existingEmail =
      await prisma.supplier.findUnique({

        where: {
          supplier_email:
          data.supplier_email
        }

      });

    if (existingEmail) {

      throw new Error(
        "Supplier Email already exists"
      );

    }

  }

  return await prisma.supplier.create({

    data: {

      ...data,

      supplier_blacklist_date:
        data.supplier_blacklist_date
          ? new Date(
              data.supplier_blacklist_date
            )
          : null

    }

  });

};

/* UPDATE */

const updateSupplier = async (
  id,
  data
) => {

  const existingSupplier =
    await prisma.supplier.findUnique({

      where: {
        supplier_id: id
      }

    });

  if (!existingSupplier) {

    throw new Error(
      `Supplier ${id} not found`
    );

  }

  return await prisma.supplier.update({

    where: {
      supplier_id: id
    },

    data: {

      ...data,

      supplier_blacklist_date:
        data.supplier_blacklist_date
          ? new Date(
              data.supplier_blacklist_date
            )
          : undefined

    }

  });

};

/* DELETE */

const deleteSupplier = async (id) => {

  return await prisma.supplier.delete({

    where: {
      supplier_id: id
    }

  });

};

module.exports = {

  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier

};