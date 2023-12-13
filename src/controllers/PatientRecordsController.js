const PatientRecords = require('../models/patient_records');

const PatientRecordsController = {
    // pull all records
    getAllPatientRecords: async (req, res) => {
        try {
            const allPatientRecords = await PatientRecords.getAllPatientRecords();
            res.json(allPatientRecords);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

    // pull one record by its ID
    getPatientRecordById: async (req, res) => {
        try {
            const { id } = req.params;
            const patientRecord = await PatientRecords.getPatientRecordById(id);

            if (patientRecord) {
                res.json(patientRecord);
            } else {
                res.status(404).send("Patient record not found");
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

    // Create a new patient record
    createPatientRecord: async (req, res) => {
        try {
            const { patient_id, date_of_visit, notes, treatment_plan } = req.body;
            const newPatientRecord = await PatientRecords.createPatientRecord({
                patient_id, date_of_visit, notes, treatment_plan
            });

            res.status(201).json(newPatientRecord);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

    // make changes to a patient record
    updatePatientRecord: async (req, res) => {
        try {
            const { id } = req.params;
            const { patient_id, date_of_visit, notes, treatment_plan } = req.body;
            const updatedPatientRecord = await PatientRecords.updatePatientRecord(id, {
                patient_id, date_of_visit, notes, treatment_plan
            });

            if (updatedPatientRecord) {
                res.json(updatedPatientRecord);
            } else {
                res.status(404).send("Patient record not found");
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

    // Delete a patient record
    deletePatientRecord: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedPatientRecord = await PatientRecords.deletePatientRecord(id);

            if (deletedPatientRecord) {
                res.json(deletedPatientRecord);
            } else {
                res.status(404).send("Patient record not found");
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

    //Search for patient records 
    searchPatientRecords: async (req, res) => {
        try {
            const searchTerm = req.query.term;
            const records = await PatientRecords.searchPatientRecords(searchTerm);
            res.json(records);
        } catch (err) {
            res.status(500).send("Server error: " + err.message);
        }
    }

};

module.exports = PatientRecordsController;
