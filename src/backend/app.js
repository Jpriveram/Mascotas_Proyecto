import express from 'express';
import cors from 'cors';
import { MascotasService} from './services/MascotasService.js';
import { MascotasRepository } from './infrastructure/MascotasRepository.js'

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Ejemplo: Ruta para obtener todas las mascotas
app.get('/api/mascotas', (req, res) => {
    // Ejemplo de cómo podrías usar tu servicio
    // const mascotas = MascotaService.obtenerTodas();
    // res.json(mascotas);
    res.json({ message: "Endpoint de mascotas funcionando" });
});

// Puedes agregar tus rutas de 'publicar-mascota', 'filtrar', etc., aquí.
// Asegúrate de que tu arquitectura hexagonal se conecte correctamente
// (e.g., MascotaService usa MascotasRepository).

// Iniciar el servidor
app.listen(port, () => {
  console.log(`🚀 Servidor backend escuchando en http://localhost:${port}`);
});