const prisma = require("../prisma/client");

const {
  createTable
} = require("../services/template.service");

const createTemplate = async (req, res) => {

  try {

    const {
      templateName,
      module,
      fields
    } = req.body;

    const template = await prisma.template.create({
      data: {
        templateName,
        module,
        fields
      }
    });

    await createTable({
      templateName,
      fields
    });

    res.status(201).json({
      success: true,
      message: "Template created successfully",
      data: template
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    });

  }

};

const getTemplates = async (req, res) => {

  try {

    const templates = await prisma.template.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    res.status(200).json({
      success: true,
      data: templates
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    });

  }

};

module.exports = {
  createTemplate,
  getTemplates
};