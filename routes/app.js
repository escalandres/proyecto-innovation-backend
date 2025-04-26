import express from 'express';
import { registrarPrenda, obtenerPrendas } from '../controllers/app.js';

const router = express.Router();

router.get('/prenda', obtenerPrendas);
router.post('/prenda', registrarPrenda);


export default router;