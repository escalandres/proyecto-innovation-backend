import express from 'express';
import { registrarPrenda, obtenerPrendas, subirFoto, upload, upload2, enviarFotoAlgoritmo } from '../controllers/app.js';

const router = express.Router();

router.get('/prenda', obtenerPrendas);
router.post('/algoritmo', upload.single('imagen'), enviarFotoAlgoritmo);
router.post('/prenda', registrarPrenda);
router.post('/upload', upload2.single('image'), subirFoto);


export default router;