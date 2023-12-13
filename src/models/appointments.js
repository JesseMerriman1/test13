const pool = require('../db');

const Appointments = {

    async getAllAppointments() {
        try {
            const allAppointments = await pool.query("SELECT * FROM appointments");
            return allAppointments.rows;
        } catch (err) {
            throw err;
        }
    },

    async getAppointmentById(id) {
        try {
            const appointment = await pool.query("SELECT * FROM appointments WHERE appointment_id = $1", [id]);
            return appointment.rows[0];
        } catch (err) {
            throw err;
        }
    },

 
    async createAppointment(appointmentData) {
        try {
            const { date, time, patient_id, vet_id, status } = appointmentData;
            const newAppointment = await pool.query(
                "INSERT INTO appointments (date, time, patient_id, vet_id, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [date, time, patient_id, vet_id, status]
            );
            return newAppointment.rows[0];
        } catch (err) {
            throw err;
        }
    },

    
    async updateAppointment(id, appointmentData) {
        try {
            const { date, time, patient_id, vet_id, status } = appointmentData;
            const updatedAppointment = await pool.query(
                "UPDATE appointments SET date = $1, time = $2, patient_id = $3, vet_id = $4, status = $5 WHERE appointment_id = $6 RETURNING *",
                [date, time, patient_id, vet_id, status, id]
            );
            return updatedAppointment.rows[0];
        } catch (err) {
            throw err;
        }
    },

    
    async deleteAppointment(id) {
        try {
            const deletedAppointment = await pool.query("DELETE FROM appointments WHERE appointment_id = $1 RETURNING *", [id]);
            return deletedAppointment.rows[0];
        } catch (err) {
            throw err;
        }
    },
    
    async searchAppointments(searchTerm) {
        try {
            const result = await pool.query("SELECT * FROM appointments WHERE date::text ILIKE $1 OR patient_id::text ILIKE $1", [`%${searchTerm}%`]);
            return result.rows;
        } catch (err) {
            throw err;
        }
    }
    
};

module.exports = Appointments;
