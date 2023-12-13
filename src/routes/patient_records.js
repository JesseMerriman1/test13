const express = require('express');
const router = express.Router();
const PatientRecordsController = require('../controllers/PatientRecordsController');

router.get('/', PatientRecordsController.getAllPatientRecords);
router.get('/:id', PatientRecordsController.getPatientRecordById);
router.post('/', PatientRecordsController.createPatientRecord);
router.put('/:id', PatientRecordsController.updatePatientRecord);
router.delete('/:id', PatientRecordsController.deletePatientRecord);
router.get('/search', PatientRecordsController.searchPatientRecords);

module.exports = router;
