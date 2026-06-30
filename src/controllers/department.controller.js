const departmentService =
require("../services/department.service");

const departmentSchema =
require("../validations/department.validation");

const getDepartments = async (req, res) => {
  try {

    const departments =
      await departmentService.getAllDepartments();

    return res.status(200).json({
      success: true,
      data: departments
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const getDepartmentById = async (req, res) => {
  try {

    const department =
      await departmentService.getDepartmentById(
        req.params.id
      );

    if (!department) {

      return res.status(404).json({
        success: false,
        message: "Department not found"
      });

    }

    return res.status(200).json({
      success: true,
      data: department
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const createDepartment = async (req, res) => {
  try {

    departmentSchema.parse(req.body);

    const department =
      await departmentService.createDepartment(
        req.body
      );

    return res.status(201).json({
      success: true,
      data: department
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }
};

const updateDepartment = async (req, res) => {
  try {

    departmentSchema
      .partial()
      .parse(req.body);

    const department =
      await departmentService.updateDepartment(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      data: department
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }
};

const deleteDepartment = async (req, res) => {
  try {

    await departmentService.deleteDepartment(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Department deleted successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {

  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment

};