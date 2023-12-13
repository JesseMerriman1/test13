const Appointments = require('../models/appointments');

const appointmentsController = {
    //Show all of the appointments
    getAllAppointments: async (req, res) => {
        try {
            const allAppointments = await Appointments.getAllAppointments();
            res.json(allAppointments);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

    //find an appointment by the ID 
    getAppointmentById: async (req, res) => {
        try {
            const { id } = req.params;
            const appointment = await Appointments.getAppointmentById(id);

            if (appointment) {
                res.json(appointment);
            } else {
                res.status(404).send("Appointment not found");
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

    // Make a new appointment 
    createAppointment: async (req, res) => {
        try {
            const { date, time, patient_id, vet_id, status } = req.body;
            const newAppointment = await Appointments.createAppointment({
                date, time, patient_id, vet_id, status
            });

            res.status(201).json(newAppointment);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

    // Make changes to an appointment 
    updateAppointment: async (req, res) => {
        try {
            const { id } = req.params;
            const { date, time, patient_id, vet_id, status } = req.body;
            const updatedAppointment = await Appointments.updateAppointment(id, {
                date, time, patient_id, vet_id, status
            });

            if (updatedAppointment) {
                res.json(updatedAppointment);
            } else {
                res.status(404).send("Appointment not found");
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

    // Delete an appointment
    deleteAppointment: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedAppointment = await Appointments.deleteAppointment(id);

            if (deletedAppointment) {
                res.json(deletedAppointment);
            } else {
                res.status(404).send("Appointment not found");
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },
    
    //search for a specific appoinment 
    searchAppointments: async (req, res) => {
        try {
            const searchTerm = req.query.term;
            const appointments = await Appointments.searchAppointments(searchTerm);
            res.json(appointments);
        } catch (err) {
            res.status(500).send("Server error: " + err.message);
        }
    }

};

module.exports = appointmentsController;
