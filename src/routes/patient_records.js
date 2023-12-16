const express = require('express');
const router = express.Router();
const patientsController = require('../controllers/PatientsRecordsController');

// Route to get all patients
router.get('/api/patients', patientsController.getAllPatients);

// Route to get a specific patient by ID
router.get('/api/patients/:id', patientsController.getPatientById);

// Route to create a new patient
router.post('/api/patients', patientsController.createPatient);

// Route to update an existing patient
router.put('/api/patients/:id', patientsController.updatePatient);

// Route to delete a patient
router.delete('/api/patients/:id', patientsController.deletePatient);

// Route to search patients
router.get('/api/patients/search', patientsController.searchPatients);

module.exports = router;
