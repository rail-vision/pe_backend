const autoAIService =
require("../services/autoAI.service");

const runAutoAI =
async(req,res)=>{

    try{

        const result =
            await autoAIService.run(
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

module.exports={

    runAutoAI

};