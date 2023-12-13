const Patients = require('../models/patients');

const patientsController = {
    // pull all patients
    getAllPatients: async (req, res) => {
        try {
            const allPatients = await Patients.getAllPatients();
            res.json(allPatients);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

    // pull a patient by ID
    getPatientById: async (req, res) => {
        try {
            const { id } = req.params;
            const patient = await Patients.getPatientById(id);

            if (patient) {
                res.json(patient);
            } else {
                res.status(404).send("Patient not found");
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

    // Create a new patient
    createPatient: async (req, res) => {
        try {
            const { name, species, breed, dob, owner_id } = req.body;
            const newPatient = await Patients.createPatient({
                name, species, breed, dob, owner_id
            });

            res.status(201).json(newPatient);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

    // make changes to a patient
    updatePatient: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, species, breed, dob, owner_id } = req.body;
            const updatedPatient = await Patients.updatePatient(id, {
                name, species, breed, dob, owner_id
            });

            if (updatedPatient) {
                res.json(updatedPatient);
            } else {
                res.status(404).send("Patient not found");
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

    // Delete a patient
    deletePatient: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedPatient = await Patients.deletePatient(id);

            if (deletedPatient) {
                res.json(deletedPatient);
            } else {
                res.status(404).send("Patient not found");
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

    //search patients by name
    searchPatients: async (req, res) => {
        try {
            const searchTerm = req.query.term;
            const patients = await Patients.searchPatients(searchTerm);
            res.json(patients);
        } catch (err) {
            res.status(500).send("Server error: " + err.message);
        }
    }
};

module.exports = patientsController;
