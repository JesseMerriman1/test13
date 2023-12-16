const express = require('express');
const router = express.Router();
const PatientRecordsController = require('../controllers/PatientRecordsController');

// Route to search patient records
router.get('/search', PatientRecordsController.searchPatientRecords);

// Route to get all patient records
router.get('/', PatientRecordsController.getAllPatientRecords);

// Route to get a specific patient record by ID
router.get('/:id', PatientRecordsController.getPatientRecordById);

// Route to create a new patient record
router.post('/', PatientRecordsController.createPatientRecord);

// Route to update an existing patient record
router.put('/:id', PatientRecordsController.updatePatientRecord);

// Route to delete a patient record
router.delete('/:id', PatientRecordsController.deletePatientRecord);

module.exports = router;
