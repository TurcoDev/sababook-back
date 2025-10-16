import { Router } from "express";
import librosController from '../controllers/book.controller.js';

const router = Router();

// Rutas
router.get('/', librosController.obtenerCatalogo);
router.get('/buscar', librosController.buscar);
router.get('/:id', librosController.verDetalle);
router.put('/:id', librosController.actualizar); 
router.delete('/:id', librosController.eliminar);                 // Borrado físico
router.patch('/inactivar/:id', librosController.eliminacionLogica); // Borrado lógico

export default router;