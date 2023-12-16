const express = require('express');
const router = express.Router();
const PatientRecordsController = require('../controllers/PatientRecordsController');

// Route to search patient records
router.get('/patient_records/search', PatientRecordsController.searchPatientRecords);

// Route to get all patient records
router.get('/patient_records', PatientRecordsController.getAllPatientRecords);

// Route to get a specific patient record by ID
router.get('/patient_records/:id', PatientRecordsController.getPatientRecordById);

// Route to create a new patient record
router.post('/patient_records', PatientRecordsController.createPatientRecord);

// Route to update an existing patient record
router.put('/patient_records/:id', PatientRecordsController.updatePatientRecord);

// Route to delete a patient record
router.delete('/patient_records/:id', PatientRecordsController.deletePatientRecord);

module.exports = router;
