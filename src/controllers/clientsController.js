const Clients = require('../models/clients');

const clientsController = {
    // pull all clients
    getAllClients: async (req, res) => {
        try {
            const allClients = await Clients.getAllClients();
            res.json(allClients);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

    // Find a client by their ID
    getClientById: async (req, res) => {
        try {
            const { id } = req.params;
            const client = await Clients.getClientById(id);

            if (client) {
                res.json(client);
            } else {
                res.status(404).send("Client not found");
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

    // Create a new client
    createClient: async (req, res) => {
        try {
            const { name, contact_info } = req.body;
            const newClient = await Clients.createClient({ name, contact_info });

            res.status(201).json(newClient);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

    // MAke changes to a client
    updateClient: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, contact_info } = req.body;

            const updatedClient = await Clients.updateClient(id, { name, contact_info });

            if (updatedClient) {
                res.json(updatedClient);
            } else {
                res.status(404).send("Client not found");
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

    // Delete a client
    deleteClient: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedClient = await Clients.deleteClient(id);

            if (deletedClient) {
                res.json(deletedClient);
            } else {
                res.status(404).send("Client not found");
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },
    //search for a client by name
    searchClients: async (req, res) => {
        try {
            const searchTerm = req.query.term;
            const clients = await Clients.searchClients(searchTerm);
            res.json(clients);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error: " + err.message);
        }
    }

};

module.exports = clientsController;
