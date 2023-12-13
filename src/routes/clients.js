const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsController');


router.get('/search', clientsController.searchClients);
router.get('/:id', clientsController.getClientById);
router.get('/', clientsController.getAllClients);
router.post('/', clientsController.createClient);
router.put('/:id', clientsController.updateClient);
router.delete('/:id', clientsController.deleteClient);

module.exports = router;
