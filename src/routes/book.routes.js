const express = require('express');
const router = express.Router();
const librosController = require('../controllers/book.controller.js');

// Rutas
router.get('/', librosController.obtenerCatalogo);
router.get('/buscar', librosController.buscar);
router.get('/:id', librosController.verDetalle);


module.exports = router;