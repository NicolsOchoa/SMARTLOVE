const express = require('express');
const cors = require('cors');
const reservasRoutes = require('./routes/reservasRoutes');
const habitacionesRoutes = require('./routes/habitacionesRoutes'); // Importa la nueva ruta de habitaciones

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/reservas', reservasRoutes);
app.use('/api/habitaciones', habitacionesRoutes); // Añade la ruta para habitaciones
app.use(express.static('views'));

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
