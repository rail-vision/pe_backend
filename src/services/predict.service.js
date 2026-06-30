const prisma = require("../config/prisma");
const predictNextValue = require("../utils/prediction");

const MODULE_MAP = {

    income: prisma.income,

    expense: prisma.expense,

    supplier: prisma.supplier,

    inventory: prisma.inventory,

    activity: prisma.activity,

    department: prisma.department,

    data_asset: prisma.dataAsset,

    asset: prisma.asset,

    people: prisma.people

};

const run = async ({
    module,
    targetField
}) => {

    const model = MODULE_MAP[module];

    if (!model) {

        throw new Error(
            `Invalid module: ${module}`
        );

    }

    const records =
        await model.findMany({

            select: {

                [targetField]: true

            }

        });

    const values =
        records
            .map(row =>
                Number(row[targetField])
            )
            .filter(value =>
                !isNaN(value)
            );

    if (values.length === 0) {

        throw new Error(
            "No numeric values found."
        );

    }

    const prediction =
        predictNextValue(values);

    return {

        module,

        targetField,

        totalRecords:
            values.length,

        ...prediction

    };

};

const getAlerts = async () => {

    return [

        {

            id: 1,

            severity: "High",

            module: "Income",

            message:
                "Income predicted to decrease next month."

        },

        {

            id: 2,

            severity: "Medium",

            module: "Inventory",

            message:
                "Inventory stock predicted to fall below threshold."

        }

    ];

};

const getPredictionReport =
async (id) => {

    return {

        reportId: id,

        generatedOn:
            new Date(),

        status:
            "Completed",

        summary:
            "Prediction generated successfully."

    };

};

module.exports = {

    run,

    getAlerts,

    getPredictionReport

};