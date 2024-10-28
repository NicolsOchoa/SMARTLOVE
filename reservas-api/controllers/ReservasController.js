const ReservasDAO = require('../dao/ReservasDAO');
const Reserva = require('../models/Reserva');
const logger = require('../utils/log'); // Importa el logger
const exportarReservasAExcel = require('../exports/exportToExcel'); // Importa la función para exportar a Excel

class ReservasController {
    crearReserva(req, res) {
        const { nombreHuesped, telefono, fechaEntrada, fechaSalida, tipoHabitacion, horario } = req.body;
        const nuevaReserva = new Reserva(null, nombreHuesped, telefono, fechaEntrada, fechaSalida, tipoHabitacion, horario);

        ReservasDAO.agregarReserva(nuevaReserva, async (error, reservaCreada) => {
            if (error) {
                logger.error("Error al crear la reserva: " + error.message);
                return res.status(500).json({ mensaje: "Error al crear la reserva" });
            }
            logger.info("Reserva creada con éxito: " + JSON.stringify(reservaCreada));

            // Generar el reporte de Excel
            try {
                await exportarReservasAExcel(reservaCreada);
                logger.info("Reporte de reserva generado con éxito en Excel.");
            } catch (error) {
                logger.error("Error al generar reporte en Excel: " + error.message);
            }

            res.status(201).json(reservaCreada);
        });
    }

    obtenerReservas(req, res) {
        ReservasDAO.obtenerReservas((error, reservas) => {
            if (error) {
                logger.error("Error al obtener reservas: " + error.message);
                return res.status(500).json({ mensaje: "Error al obtener reservas" });
            }
            logger.info("Reservas obtenidas con éxito.");
            res.json(reservas);
        });
    }

    obtenerReserva(req, res) {
        const id = parseInt(req.params.id);
        ReservasDAO.obtenerReservaPorId(id, (error, reserva) => {
            if (error) {
                logger.error("Error al obtener la reserva: " + error.message);
                return res.status(500).json({ mensaje: "Error al obtener la reserva" });
            } else if (!reserva) {
                logger.warn(`Reserva con ID ${id} no encontrada.`);
                return res.status(404).json({ mensaje: "Reserva no encontrada" });
            }
            logger.info(`Reserva obtenida con éxito: ID ${id}`);
            res.json(reserva);
        });
    }

    actualizarReserva(req, res) {
        const id = parseInt(req.params.id);
        const nuevosDatos = req.body;
        ReservasDAO.actualizarReserva(id, nuevosDatos, (error, reservaActualizada) => {
            if (error) {
                logger.error("Error al actualizar la reserva: " + error.message);
                return res.status(500).json({ mensaje: "Error al actualizar la reserva" });
            } else if (!reservaActualizada) {
                logger.warn(`Reserva con ID ${id} no encontrada para actualizar.`);
                return res.status(404).json({ mensaje: "Reserva no encontrada" });
            }
            logger.info(`Reserva actualizada con éxito: ID ${id}`);
            res.json(reservaActualizada);
        });
    }

    eliminarReserva(req, res) {
        const id = parseInt(req.params.id);
        ReservasDAO.eliminarReserva(id, (error, reservaEliminada) => {
            if (error) {
                logger.error("Error al eliminar la reserva: " + error.message);
                return res.status(500).json({ mensaje: "Error al eliminar la reserva" });
            } else if (!reservaEliminada) {
                logger.warn(`Reserva con ID ${id} no encontrada para eliminar.`);
                return res.status(404).json({ mensaje: "Reserva no encontrada" });
            }
            logger.info(`Reserva eliminada con éxito: ID ${id}`);
            res.json({ mensaje: "Reserva eliminada con éxito" });
        });
    }
}

module.exports = new ReservasController();
