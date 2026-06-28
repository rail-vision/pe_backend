const pptService =
require("../services/ppt.service");

const generatePPT =
async (req,res) => {

  try {

    const filePath =
      await pptService.generatePPT();

    return res.status(200).json({

      success:true,

      file:filePath

    });

  }

  catch(error){

    return res.status(500).json({

      success:false,

      error:error.message

    });

  }

};

module.exports = {
  generatePPT
};