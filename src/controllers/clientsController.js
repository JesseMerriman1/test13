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
            const { name, phone_number, address } = req.body;
            // Fix typo: change 'phone' to 'phone_number'
            const newClient = await Clients.createClient({ name, phone_number, address });

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
            const { name, phoneNumber, address } = req.body;
            // Fix variable naming inconsistency: change 'phoneNumber' to 'phone_number'
            const updatedClient = await Clients.updateClient(id, { name, phone_number, address });

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

    // Delete a client by phone number
    deleteClientByPhone: async (req, res) => {
        try {
            const { phone_number } = req.params;
            // Fix method name: change 'deleteClientByPhone' to 'deleteClient'
            const deletedClient = await Clients.deleteClient(phone_number);

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
