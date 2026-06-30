const predictService =
require("./predict.service");

const clusterService =
require("./cluster.service");


const run = async({

    module,

    variables,

    targetField

})=>{

    const prediction =
        await predictService.run({

            module,

            targetField

        });

    const clustering =
        await clusterService.run({

            module,

            variables

        });

    const correlation =
        await correlationService.run({

            variables

        });

    const outlier =
        await outlierService.run({

            module,

            field:targetField

        });

    return{

        module,

        prediction,

        clustering,

        correlation,

        outlier,

        summary:{

            recommendation:
            "Auto AI completed successfully.",

            completedModules:[

                "Prediction",

                "Cluster",

                "Correlation",

                "Outlier"

            ]

        }

    };

};

module.exports={

    run

};