const prisma = require("../config/prisma");
console.log("Presentation Service Loaded");
/*
CREATE PRESENTATION
*/

const createPresentation = async (data) => {

    const presentation =
        await prisma.presentation.create({

            data: {

                presentationId: data.presentationId,

                title: data.title,

                description: data.description,

                module: data.module,

                presentationType: data.presentationType,

                theme: data.theme,

                createdBy: data.createdBy

            }

        });

    return presentation;

};

/*
GET ALL PRESENTATIONS
*/

const getPresentations = async () => {

    return await prisma.presentation.findMany({

        orderBy: {

            createdAt: "desc"

        }

    });

};

/*
GET ONE PRESENTATION
*/

const getPresentationById = async (presentationId) => {

    return await prisma.presentation.findUnique({

        where: {

            presentationId

        },

        include: {

            slides: true,

            exports: true

        }

    });

};

/*
UPDATE PRESENTATION
*/

const updatePresentation = async (

    presentationId,

    data

) => {

    return await prisma.presentation.update({

        where: {

            presentationId

        },

        data

    });

};

/*
DELETE PRESENTATION
*/

const deletePresentation = async (presentationId) => {

    return await prisma.presentation.delete({

        where: {

            presentationId

        }

    });

};

module.exports = {

    createPresentation,

    getPresentations,

    getPresentationById,

    updatePresentation,

    deletePresentation

};