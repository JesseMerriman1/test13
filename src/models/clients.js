const pool = require('../db');

const Clients = {
    async getAllClients() {
        try {
            const allClients = await pool.query('SELECT client_id, name, phone_number AS "phoneNumber", address, pets_name AS "petsName" FROM clients');
            return allClients.rows;
        } catch (err) {
            console.error('Error in getAllClients:', err);
            throw err;
        }
    },

    async getClientById(id) {
        try {
            if (isNaN(parseInt(id, 10))) {
                throw new Error('Invalid client ID');
            }
            const client = await pool.query('SELECT client_id, name, phone_number AS "phoneNumber", address, pets_name AS "petsName" FROM clients WHERE client_id = $1', [id]);
            return client.rows[0];
        } catch (err) {
            console.error('Error in getClientById:', err);
            throw err;
        }
    },

    async createClient(clientData) {
        try {
            const { name, phoneNumber, address, petsName } = clientData;
            const newClient = await pool.query(
                'INSERT INTO clients (name, phone_number, address, pets_name) VALUES ($1, $2, $3, $4) RETURNING client_id, name, phone_number AS "phoneNumber", address, pets_name AS "petsName"',
                [name, phoneNumber, address, petsName]
            );
            return newClient.rows[0];
        } catch (err) {
            console.error('Error in createClient:', err);
            throw err;
        }
    },

    async updateClient(id, clientData) {
        try {
            if (isNaN(parseInt(id, 10))) {
                throw new Error('Invalid client ID');
            }
            const { name, phoneNumber, address, petsName } = clientData;
            const updatedClient = await pool.query(
                'UPDATE clients SET name = $1, phone_number = $2, address = $3, pets_name = $4 WHERE client_id = $5 RETURNING client_id, name, phone_number AS "phoneNumber", address, pets_name AS "petsName"',
                [name, phoneNumber, address, petsName, id]
            );
            return updatedClient.rows[0];
        } catch (err) {
            console.error('Error in updateClient:', err);
            throw err;
        }
    },

    async deleteClient(clientId) {
        try {
            const deletedClient = await pool.query('DELETE FROM clients WHERE client_id = $1 RETURNING *', [clientId]);
            return deletedClient.rows[0];
        } catch (err) {
            console.error('Error in deleteClient:', err);
            throw err;
        }
    },

    async searchClients(searchTerm) {
        try {
            const result = await pool.query(
                'SELECT client_id, name, phone_number AS "phoneNumber", address, pets_name AS "petsName" FROM clients WHERE name ILIKE $1 OR phone_number ILIKE $1 OR address ILIKE $1 OR pets_name ILIKE $1',
                [`%${searchTerm}%`]
            );
            return result.rows;
        } catch (err) {
            console.error('Error in searchClients:', err);
            throw err;
        }
    },
};

module.exports = Clients;
