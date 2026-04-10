import { db } from './db';

async function testConnection() {
  try {
    const connection = await db;
    await connection.connect();
    console.log('Conexion exitosa a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

testConnection();