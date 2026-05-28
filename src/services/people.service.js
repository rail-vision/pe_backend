const prisma = require("../lib/prisma");

/*
|--------------------------------------------------------------------------
| Get All People
|--------------------------------------------------------------------------
*/

const getAllPeople = async () => {

  return await prisma.people.findMany();

};

/*
|--------------------------------------------------------------------------
| Get Single Person
|--------------------------------------------------------------------------
*/

const getPersonById = async (id) => {

  return await prisma.people.findUnique({
    where: {
      id
    }
  });

};

/*
|--------------------------------------------------------------------------
| Create Person
|--------------------------------------------------------------------------
*/

const createPerson = async (data) => {

  /*
  |--------------------------------------------------------------------------
  | Duplicate Person ID Check
  |--------------------------------------------------------------------------
  */

  const existingPersonId = await prisma.people.findUnique({
    where: {
      personId: data.personId
    }
  });

  if (existingPersonId) {

    throw new Error("Person ID already exists");

  }

  /*
  |--------------------------------------------------------------------------
  | Duplicate Work Email Check
  |--------------------------------------------------------------------------
  */

  const existingEmail = await prisma.people.findUnique({
    where: {
      workEmail: data.workEmail
    }
  });

  if (existingEmail) {

    throw new Error("Work email already exists");

  }

  /*
  |--------------------------------------------------------------------------
  | Create Person
  |--------------------------------------------------------------------------
  */

  return await prisma.people.create({
    data
  });

};

/*
|--------------------------------------------------------------------------
| Update Person
|--------------------------------------------------------------------------
*/

const updatePerson = async (id, data) => {

  return await prisma.people.update({
    where: {
      id
    },
    data
  });

};

/*
|--------------------------------------------------------------------------
| Delete Person
|--------------------------------------------------------------------------
*/

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