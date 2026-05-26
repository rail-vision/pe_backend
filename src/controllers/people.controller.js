const peopleService = require("../services/people.service");

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

const createPerson = async (req, res) => {

  try {

    const person = await peopleService.createPerson(
      req.body
    );

    res.status(201).json({
      success: true,
      data: person
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to create person"
    });

  }

};

const updatePerson = async (req, res) => {

  try {

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

    res.status(500).json({
      success: false,
      message: "Failed to update person"
    });

  }

};

const deletePerson = async (req, res) => {

  try {

    await peopleService.deletePerson(req.params.id);

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