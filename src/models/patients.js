const pool = require('../db');

const Patients = {
    
    async getAllPatients() {
        try {
            const allPatients = await pool.query("SELECT * FROM patients");
            return allPatients.rows;
        } catch (err) {
            throw err;
        }
    },

    
    async getPatientById(id) {
        try {
            const patient = await pool.query("SELECT * FROM patients WHERE patient_id = $1", [id]);
            return patient.rows[0];
        } catch (err) {
            throw err;
        }
    },

    
    async createPatient(patientData) {
        try {
            const { name, species, breed, dob, owner_id } = patientData;
            const newPatient = await pool.query(
                "INSERT INTO patients (name, species, breed, dob, owner_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [name, species, breed, dob, owner_id]
            );
            return newPatient.rows[0];
        } catch (err) {
            throw err;
        }
    },

    
    async updatePatient(id, patientData) {
        try {
            const { name, species, breed, dob, owner_id } = patientData;
            const updatedPatient = await pool.query(
                "UPDATE patients SET name = $1, species = $2, breed = $3, dob = $4, owner_id = $5 WHERE patient_id = $6 RETURNING *",
                [name, species, breed, dob, owner_id, id]
            );
            return updatedPatient.rows[0];
        } catch (err) {
            throw err;
        }
    },

    
    async deletePatient(id) {
        try {
            const deletedPatient = await pool.query("DELETE FROM patients WHERE patient_id = $1 RETURNING *", [id]);
            return deletedPatient.rows[0];
        } catch (err) {
            throw err;
        }
    },

    
    async searchPatients(searchTerm) {
        try {
            const result = await pool.query("SELECT * FROM patients WHERE name ILIKE $1 OR species ILIKE $1 OR breed ILIKE $1", [`%${searchTerm}%`]);
            return result.rows;
        } catch (err) {
            throw err;
        }
    }
    
};

module.exports = Patients;
