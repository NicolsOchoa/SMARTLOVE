// reservas/routes/reservasRoutes.js
const express = require('express');
const router = express.Router();
const ReservasController = require('../controllers/ReservasController');

router.post('/', ReservasController.crearReserva);        // Crear reserva
router.get('/', ReservasController.obtenerReservas);      // Obtener todas las reservas
router.get('/:id', ReservasController.obtenerReserva);    // Obtener reserva por ID
router.put('/:id', ReservasController.actualizarReserva); // Actualizar reserva por ID
router.delete('/:id', ReservasController.eliminarReserva);// Eliminar reserva por ID

module.exports = router;
