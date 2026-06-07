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