<<<<<<< HEAD
const prisma = require("../config/prisma");

const {
  createTable
} = require("../services/dynamic.service");

const createTemplate = async (req, res) => {

  try {

    const {
      templateName,
      module,
      fields
    } = req.body;

    /*SAVE TEMPLATE*/

    const template = await prisma.template.create({

      data: {
        templateName,
        module,
        fields
      }

    });

    /*AUTO CREATE DYNAMIC TABLE*/

    await createTable({
      tableName: templateName,
      fields
    });

    res.status(201).json({
      success: true,
      data: template
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    });

  }

};

module.exports = {
  createTemplate
};
=======
const prisma = require("../config/prisma"); 

const { createTable } = require("../services/template.service");

/*CREATE TEMPLATE + TABLE*/
const createTemplate = async (req, res) => {
  try {
    const { templateName, module, fields } = req.body

    //Validate required fields
    if (!templateName || !module || !Array.isArray(fields) || fields.length === 0) {
      return res.status(400).json({
        success: false,
        message: "templateName, module and fields are required"
      })
    }

    //Create template record in DB
    const template = await prisma.template.create({
      data: { templateName, module, fields }
    })

    // Create actual table in DB
    await createTable({ templateName, fields })

    res.status(201).json({
      success: true,
      message: "Template created successfully",
      data:    template
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
}

/*GET ALL TEMPLATES*/
const getTemplates = async (req, res) => {
  try {
    const templates = await prisma.template.findMany({
      orderBy: { createdAt: "desc" }
    })
    res.status(200).json({ success: true, data: templates })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
}

/*GET SINGLE TEMPLATE*/
const getTemplate = async (req, res) => {
  try {
    const template = await prisma.template.findUnique({
      where: { id: req.params.id }
    })
    if (!template) {
      return res.status(404).json({ success: false, message: "Template not found" })
    }
    res.status(200).json({ success: true, data: template })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
}

/*DELETE TEMPLATE*/
const deleteTemplate = async (req, res) => {
  try {
    const existing = await prisma.template.findUnique({
      where: { id: req.params.id }
    })
    if (!existing) {
      return res.status(404).json({ success: false, message: "Template not found" })
    }
    await prisma.template.delete({ where: { id: req.params.id } })
    res.status(200).json({ success: true, message: "Template deleted successfully" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { createTemplate, getTemplates, getTemplate, deleteTemplate }
>>>>>>> 073cb674c90ff3ebe1e65f446f1ea93023ef87f3
