const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());  // Habilitar CORS para solicitudes desde tu frontend
app.use(express.json());  // Para analizar el cuerpo de las solicitudes en formato JSON

// Conectar a MongoDB
mongoose.connect('mongodb+srv://celeste21:123@cluster0.1lysx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Definir el esquema y modelo de MongoDB
const registroSchema = new mongoose.Schema({
  campo1: String,
  campo2: String,
  campo3: String,
  campo4: String,
  campo5: String,
  campo6: String,
});

const Registro = mongoose.model('Registro', registroSchema);

// Ruta para guardar los datos
app.post('/api/registro', async (req, res) => {
  try {
    const nuevoRegistro = new Registro(req.body);
    await nuevoRegistro.save();
    res.status(201).json({ message: 'Registro guardado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar el registro', error });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
