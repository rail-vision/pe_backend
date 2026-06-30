const peopleService = require("../services/people.service");
const peopleSchema  = require("../validations/people.validation");

const getPeople = async (req, res) => {
  try {
    const people = await peopleService.getAllPeople()
    res.status(200).json({ success: true, data: people })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: "Failed to fetch people" })
  }
}

const getPerson = async (req, res) => {
  try {
    const person = await peopleService.getPersonById(req.params.id)
    if (!person) {
      return res.status(404).json({ success: false, message: "Person not found" })
    }
    res.status(200).json({ success: true, data: person })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: "Failed to fetch person" })
  }
}

const createPerson = async (req, res) => {
  try {
    const validatedData = peopleSchema.parse(req.body)  // ✅ use validated data
    const person = await peopleService.createPerson(validatedData)
    res.status(201).json({ success: true, data: person })
  } catch (error) {
    console.error(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

const updatePerson = async (req, res) => {
  try {
    const validatedData = peopleSchema.partial().parse(req.body)  // ✅ use validated data
    const person = await peopleService.updatePerson(req.params.id, validatedData)
    res.status(200).json({ success: true, data: person })
  } catch (error) {
    console.error(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

const deletePerson = async (req, res) => {
  try {
    await peopleService.deletePerson(req.params.id)
    res.status(200).json({ success: true, message: "Person deleted successfully" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: "Failed to delete person" })
  }
}

module.exports = { getPeople, getPerson, createPerson, updatePerson, deletePerson }