import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

// Cargar la variable de entorno con el URI de MongoDB
import dotenv from 'dotenv';
dotenv.config();

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definir el modelo de registro
const registroSchema = new mongoose.Schema({
  campo1: String,
  campo2: String,
  campo3: String,
  campo4: String,
  campo5: String,
  campo6: String,
});

const Registro = mongoose.model('Registro', registroSchema);

// Crear la aplicación Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Ruta para manejar las solicitudes POST de registro
app.post('/api/registro', async (req, res) => {
  try {
    const nuevoRegistro = new Registro(req.body);
    await nuevoRegistro.save();
    res.status(201).json({ message: 'Datos guardados con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar el registro', error });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
