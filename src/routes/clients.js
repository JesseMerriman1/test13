const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsController');

// Route for searching clients
router.get('/search', clientsController.searchClients);

// Route for getting a client by ID
router.get('/:id', clientsController.getClientById);

// Route for getting all clients
router.get('/', clientsController.getAllClients);

// Route for creating a new client
router.post('/', clientsController.createClient);

// Route for updating a client
router.put('/:id', clientsController.updateClient);

// Corrected route for deleting a client by phone number
router.delete('/deleteByPhone/:phone_number', clientsController.deleteClientByPhone);

module.exports = router;
