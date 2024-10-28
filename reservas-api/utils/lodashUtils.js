// utils/lodashUtils.js
const _ = require('lodash');

const agruparReservasPorFecha = (reservas) => {
    return _.groupBy(reservas, 'fechaEntrada');
};

module.exports = {
    agruparReservasPorFecha,
};
