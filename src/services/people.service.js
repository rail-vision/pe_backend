const prisma = require("../config/prisma");

/*GET ALL PEOPLE*/
const getAllPeople = async () => {
  return await prisma.people.findMany();
};

/*GET SINGLE PERSON*/
const getPersonById = async (id) => {
  return await prisma.people.findUnique({
    where: { id },
  });
};

/*CREATE PERSON*/
const createPerson = async (data) => {
  // ✅ Auto-generate personId if not provided
  if (!data.personId) {
    data.personId = `PER-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  // Duplicate personId check
  const existingPersonId = await prisma.people.findUnique({
    where: { personId: data.personId },
  });
  if (existingPersonId) {
    throw new Error("Person ID already exists");
  }

  // Duplicate workEmail check
  const existingEmail = await prisma.people.findUnique({
    where: { workEmail: data.workEmail },
  });
  if (existingEmail) {
    throw new Error("Work email already exists");
  }

  return await prisma.people.create({ data });
};

/*UPDATE PERSON*/
const updatePerson = async (id, data) => {
  const existing = await prisma.people.findUnique({ where: { id } });
  if (!existing) {
    throw new Error("Person not found");
  }
  return await prisma.people.update({ where: { id }, data });
};

/*DELETE PERSON*/
const deletePerson = async (id) => {
  const existing = await prisma.people.findUnique({ where: { id } });
  if (!existing) {
    throw new Error("Person not found");
  }
  return await prisma.people.delete({ where: { id } });
};

module.exports = {
  getAllPeople,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson,
};
