class Reserva {
  constructor(id, nombreHuesped, telefono, fechaEntrada, fechaSalida, tipoHabitacion, horario) {
    this.id = id;
    this.nombreHuesped = nombreHuesped;
    this.telefono = telefono;
    this.fechaEntrada = fechaEntrada;
    this.fechaSalida = fechaSalida;
    this.tipoHabitacion = tipoHabitacion;
    this.horario = horario;
  }
}

module.exports = Reserva;
