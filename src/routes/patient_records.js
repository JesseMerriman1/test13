const express = require('express');
const router = express.Router();
const PatientRecordsController = require('../controllers/PatientRecordsController');

// Route to get all patient records
router.get('/api/patient-records', PatientRecordsController.getAllPatientRecords);

// Route to get a specific patient record by ID
router.get('/api/patient-records/:id', PatientRecordsController.getPatientRecordById);

// Route to create a new patient record
router.post('/api/patient-records', PatientRecordsController.createPatientRecord);

// Route to update an existing patient record
router.put('/api/patient-records/:id', PatientRecordsController.updatePatientRecord);

// Route to delete a patient record
router.delete('/api/patient-records/:id', PatientRecordsController.deletePatientRecord);

// Route to search patient records
router.get('/api/patient-records/search', PatientRecordsController.searchPatientRecords);

module.exports = router;
