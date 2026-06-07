const peopleService = require("../services/people.service");

const peopleSchema = require("../validations/people.validation");

/*GET ALL PEOPLE*/

const getPeople = async (req, res) => {

  try {

    const people = await peopleService.getAllPeople();

    res.status(200).json({
      success: true,
      data: people
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch people"
    });

  }

};

/*GET SINGLE PERSON*/

const getPerson = async (req, res) => {

  try {

    const person = await peopleService.getPersonById(
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: person
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch person"
    });

  }

};

/*CREATE PERSON*/

const createPerson = async (req, res) => {

  try {

    /*Validate Request Body*/

    peopleSchema.parse(req.body);

    const person = await peopleService.createPerson(
      req.body
    );

    res.status(201).json({
      success: true,
      data: person
    });

  } catch (error) {

    console.log(error);

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

/*UPDATE PERSON*/

const updatePerson = async (req, res) => {

  try {

    /*Partial Validation For Update*/

    peopleSchema.partial().parse(req.body);

    const person = await peopleService.updatePerson(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      data: person
    });

  } catch (error) {

    console.log(error);

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

/* DELETE */

const deletePerson = async (req, res) => {

  try {

    await peopleService.deletePerson(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Person deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete person"
    });

  }

};

module.exports = {
  getPeople,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson
};