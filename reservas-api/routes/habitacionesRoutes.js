const express = require('express');
const router = express.Router();
const db = require('../db'); // Asegúrate de que esta conexión a la base de datos esté configurada correctamente en db.js

// Ruta para obtener las habitaciones
router.get('/', (req, res) => {
  const query = 'SELECT * FROM habitaciones';

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener habitaciones:', error);
      res.status(500).json({ error: 'Error al obtener habitaciones' });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
