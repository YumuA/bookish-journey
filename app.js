const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

const pool = new Pool({
  user: 'fl0user',      
  host: 'ep-orange-rice-52185177.us-east-2.aws.neon.fl0.io',    
  database: 'SsantDB',
  password: 'CahKrIp51Mck',      
  port: 5432,
  ssl: {
    require: true, // Establece SSL como requerido
  },
});            


app.get('/perras', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM parejas');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    res.status(500).json({ error: error.message }); 
  }
});
app.get('/perras-puntuacion', async (req, res) => {
  try {
    const query = `
      SELECT parejas.*, comentarios.comentarios
      FROM parejas
      INNER JOIN comentarios ON parejas.id_pareja = comentarios.id_pareja
    `;
    
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    res.status(500).json({ error: error.message }); 
  }
});
app.use(express.static(__dirname));





app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
