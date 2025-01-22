import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config(); // Carga las variables de entorno

const uri = process.env.MONGODB_URI; // Usa el URI de conexión desde el archivo .env

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connectToDB = async () => {
  try {
    await client.connect();
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB', error);
  }
};

connectToDB();

export { client };
