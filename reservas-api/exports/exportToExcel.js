// exports/exportToExcel.js
const ExcelJS = require('exceljs');
const fs = require('fs');

async function exportarReservasAExcel(reserva) {
    const workbook = new ExcelJS.Workbook();
    const filePath = 'exports/reports/reservas.xlsx';

    // Si el archivo no existe, crea un nuevo archivo y agrega encabezados
    if (!fs.existsSync(filePath)) {
        const worksheet = workbook.addWorksheet('Reservas');
        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Nombre Huesped', key: 'nombreHuesped', width: 20 },
            { header: 'Teléfono', key: 'telefono', width: 15 },
            { header: 'Fecha Entrada', key: 'fechaEntrada', width: 15 },
            { header: 'Fecha Salida', key: 'fechaSalida', width: 15 },
            { header: 'Tipo de Habitación', key: 'tipoHabitacion', width: 20 },
            { header: 'Horario', key: 'horario', width: 10 }
        ];
    } else {
        await workbook.xlsx.readFile(filePath); // Si el archivo ya existe, léelo
    }

    const worksheet = workbook.getWorksheet('Reservas');
    worksheet.addRow(reserva); // Añadir una nueva reserva

    await workbook.xlsx.writeFile(filePath);
    console.log('Archivo de reservas actualizado con éxito.');
}

module.exports = exportarReservasAExcel;
    