const db = require('../db');

class ReservasDAO {
  agregarReserva(reserva, callback) {
    const query = `INSERT INTO reservas (nombreHuesped, telefono, fechaEntrada, fechaSalida, tipoHabitacion, horario) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [reserva.nombreHuesped, reserva.telefono, reserva.fechaEntrada, reserva.fechaSalida, reserva.tipoHabitacion, reserva.horario];
    
    db.query(query, values, (error, results) => {
      if (error) return callback(error);
      reserva.id = results.insertId;
      callback(null, reserva);
    });
  }

  obtenerReservas(callback) {
    db.query('SELECT * FROM reservas', (error, results) => {
      if (error) return callback(error);
      callback(null, results);
    });
  }
}

module.exports = new ReservasDAO();
