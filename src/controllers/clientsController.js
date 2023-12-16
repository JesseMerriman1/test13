const Clients = require('../models/clients');

const clientsController = {
    // Fetch all clients
    getAllClients: async (req, res) => {
        try {
            const allClients = await Clients.getAllClients();
            res.json(allClients);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

    // Retrieve a client by their ID
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
            const { name, phoneNumber, address, petsName } = req.body;
            const newClient = await Clients.createClient({ name, phoneNumber, address, petsName });

            res.status(201).json(newClient);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

    // Update a client's details
    updateClient: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, phoneNumber, address, petsName } = req.body;

            const updatedClient = await Clients.updateClient(id, { name, phoneNumber, address, petsName });

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

    // Delete a client by client ID
    deleteClient: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedClient = await Clients.deleteClient(id);

            if (deletedClient) {
                res.json({ message: "Client successfully deleted" });
            } else {
                res.status(404).send("Client not found");
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },

    // Search for clients by name, phone number, or address
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
