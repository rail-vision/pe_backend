const prisma = require("../config/prisma");

const getAllDepartments = async () => {

  return await prisma.department.findMany();

};

const getDepartmentById = async (id) => {

  return await prisma.department.findUnique({

    where: {
      department_id: id
    }

  });

};

const createDepartment = async (data) => {

  const existingDepartment =
    await prisma.department.findUnique({

      where: {
        department_name:
          data.department_name
      }

    });

  if (existingDepartment) {

    throw new Error(
      "Department already exists"
    );

  }

  return await prisma.department.create({
    data
  });

};

const updateDepartment = async (
  id,
  data
) => {

  const department =
    await prisma.department.findUnique({

      where: {
        department_id: id
      }

    });

  if (!department) {

    throw new Error(
      `Department ${id} not found`
    );

  }

  return await prisma.department.update({

    where: {
      department_id: id
    },

    data

  });

};

const deleteDepartment = async (id) => {

  return await prisma.department.delete({

    where: {
      department_id: id
    }

  });

};

module.exports = {

  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment

};