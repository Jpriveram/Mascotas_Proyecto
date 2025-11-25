import express from 'express';
import cors from 'cors';
import { MascotasService} from './services/MascotasService.js';
import { MascotasRepository } from './infrastructure/MascotasRepository.js'

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const mascotasRepository = new MascotasRepository();
const mascotasService = new MascotasService(mascotasRepository);

// Listar todas las mascotas
app.get('/api/mascotas', async (req, res) => {
    try {
        const mascotas = await mascotasService.listarMascotas();
        res.json(mascotas);
    } catch (error) {
        console.error('Error al obtener mascotas:', error.message);
        res.status(500).json({ error: 'Fallo interno del servidor al obtener mascotas.' });
    }
});

// Filtrar mascotas por rango de edad 
app.get('/api/mascotas/filtrar', async (req, res) => {
    try {
        const desde = parseInt(req.query.desde);
        const hasta = parseInt(req.query.hasta);

        if (isNaN(desde) || isNaN(hasta)) {
            return res.status(400).json({ error: "Los parámetros 'desde' y 'hasta' deben ser números válidos." });
        }
        const mascotasFiltradas = await mascotasService.filtrarMascotasPorEdad(desde, hasta);
        res.json(mascotasFiltradas);
    } catch (error) {
        console.error('Error al filtrar mascotas:', error.message);
        res.status(500).json({ error: 'Fallo interno del servidor al filtrar mascotas.' });
    }
});

// Filtrar mascotas por raza 
app.get('/api/mascotas/raza', async (req, res) => {
    try {
        const raza = req.query.nombre;
        
        if (!raza) {
            return res.status(400).json({ error: "El parámetro 'nombre' (raza) es requerido." });
        }
        
        const mascotasFiltradas = await mascotasService.filtrarMascotasPorRaza(raza);
        res.json(mascotasFiltradas);
    } catch (error) {
        console.error('Error al filtrar mascotas por raza:', error.message);
        res.status(500).json({ error: 'Fallo interno del servidor al filtrar mascotas.' });
    }
});

// Obtener mascota por id
app.get('/api/mascotas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const parsedId = parseInt(id);

        if (isNaN(parsedId)) {
             return res.status(400).json({ error: `ID de mascota inválido: ${id}. Debe ser un número entero.` });
        }
        
        const mascota = await mascotasService.obtenerMascotaPorId(parsedId);

        if (!mascota) {
            return res.status(404).json({ error: `Mascota con ID ${id} no encontrada.` });
        }       
        res.json(mascota);
    } catch (error) {
        console.error(`Error al obtener mascota por ID ${req.params.id}:`, error.message);
        res.status(500).json({ error: 'Fallo interno del servidor al obtener la mascota.' });
    }
});


// Publicar una mascota
app.post('/api/mascotas', async (req, res) => {
    try {
        const { nombre, raza, edad, especie, foto } = req.body;
        const nuevaMascota = await mascotasService.publicarMascota(nombre, raza, edad, especie, foto);
        res.status(201).json({ 
            message: "Mascota publicada con éxito",
            mascota: nuevaMascota
        });
    } catch (error) {
        console.error('Error al publicar mascota:', error.message);
        res.status(500).json({ error: 'Fallo interno del servidor al publicar la mascota.' });
    }
});


app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
  console.log('API Endpoints disponibles:');
  console.log(`- GET /api/mascotas`);
  console.log(`- GET /api/mascotas/filtrar?desde=X&hasta=Y`);
  console.log(`- GET /api/mascotas/raza?nombre=X`);
  console.log(`- GET /api/mascotas/:id`);
  console.log(`- POST /api/mascotas`);
});