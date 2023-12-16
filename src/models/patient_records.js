const pool = require('../db');

const PatientRecords = {
    async getAllPatientRecords() {
        try {
            const allPatientRecords = await pool.query("SELECT * FROM patient_records");
            return allPatientRecords.rows;
        } catch (err) {
            throw err;
        }
    },

    async getPatientRecordById(id) {
        try {
            const patientRecord = await pool.query("SELECT * FROM patient_records WHERE record_id = $1", [id]);
            return patientRecord.rows[0];
        } catch (err) {
            throw err;
        }
    },

    async createPatientRecord(recordData) {
        try {
            const { patient_id, date_of_visit, notes, treatment_plan } = recordData;
            const newPatientRecord = await pool.query(
                "INSERT INTO patient_records (patient_id, date_of_visit, notes, treatment_plan) VALUES ($1, $2, $3, $4) RETURNING *",
                [patient_id, date_of_visit, notes, treatment_plan]
            );
            return newPatientRecord.rows[0];
        } catch (err) {
            throw err;
        }
    },

    async updatePatientRecord(id, recordData) {
        try {
            const { patient_id, date_of_visit, notes, treatment_plan } = recordData;
            const updatedPatientRecord = await pool.query(
                "UPDATE patient_records SET patient_id = $1, date_of_visit = $2, notes = $3, treatment_plan = $4 WHERE record_id = $5 RETURNING *",
                [patient_id, date_of_visit, notes, treatment_plan, id]
            );
            return updatedPatientRecord.rows[0];
        } catch (err) {
            throw err;
        }
    },

    async deletePatientRecord(id) {
        try {
            const deletedPatientRecord = await pool.query("DELETE FROM patient_records WHERE record_id = $1 RETURNING *", [id]);
            return deletedPatientRecord.rows[0];
        } catch (err) {
            throw err;
        }
    },

    async searchPatientRecords(searchTerm) {
        try {
            const result = await pool.query("SELECT * FROM patient_records WHERE record_id = $1 OR notes ILIKE $2 OR treatment_plan ILIKE $2", [searchTerm, `%${searchTerm}%`]);
            return result.rows;
        } catch (err) {
            throw err;
        }
    }
};

module.exports = PatientRecords;
