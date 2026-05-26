const prisma = require("../lib/prisma");

const getAllPeople = async () => {

  return await prisma.people.findMany();

};

const getPersonById = async (id) => {

  return await prisma.people.findUnique({
    where: {
      id
    }
  });

};

const createPerson = async (data) => {

  return await prisma.people.create({
    data
  });

};

const updatePerson = async (id, data) => {

  return await prisma.people.update({
    where: {
      id
    },
    data
  });

};

const deletePerson = async (id) => {

  return await prisma.people.delete({
    where: {
      id
    }
  });

};

module.exports = {
  getAllPeople,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson
};