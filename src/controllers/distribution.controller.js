const distributionService =
require(
  "../services/distribution.service"
);

const generateDistribution =
async (req,res) => {

  try {

    const result =
      await distributionService.generate(
        req.body
      );

    return res.status(200).json({

      success:true,

      data:result

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

  generateDistribution

};