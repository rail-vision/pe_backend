const fieldMappingService =
require("../services/fieldMapping.service");

const saveFieldMapping = async (req,res) => {

  try {

    const { module, mapping } = req.body;

    const result =
      await fieldMappingService.saveMapping(
        module,
        mapping
      );

    res.status(200).json({
      success:true,
      data:result
    });

  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};

const getFieldMapping = async (req,res) => {

  try {

    const result =
      await fieldMappingService.getMapping(
        req.params.module
      );

    res.status(200).json({
      success:true,
      data:result
    });

  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};

module.exports = {
  saveFieldMapping,
  getFieldMapping
};