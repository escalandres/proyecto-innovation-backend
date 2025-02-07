import express from 'express';
import { obtenerInfo } from '../controllers/app.js';

const router = express.Router();

router.get('/get-info', obtenerInfo);

export default router;