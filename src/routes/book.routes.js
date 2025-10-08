const express = require('express');
const router = express.Router();
const librosController = require('../controllers/bookController.js');

// Rutas
router.get('/', librosController.obtenerCatalogo);
