const express = require('express');
const router = express.Router();
const foroController = require('../controllers/foroController');

router.post('/', foroController.crearForo);       // Crear
router.get('/', foroController.obtenerForos);    // Leer todos
router.get('/:id', foroController.obtenerForo);  // Leer uno
router.put('/:id', foroController.actualizarForo); // Actualizar
router.delete('/:id', foroController.eliminarForo); // Eliminar

module.exports = router;
