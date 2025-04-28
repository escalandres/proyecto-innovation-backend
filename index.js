//NPM modules - ECMAScript Modules
import path from 'path';
import express from 'express';
import cors from 'cors';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// -------------- My modules --------------
import appRoutes from './routes/app.js';

// -------------- Variables modules --------------
const app = express();

// -------------- Variables Globales --------------
// Obtiene la URL del archivo actual
const currentFileURL = import.meta.url;
// Convierte la URL del archivo en una ruta de sistema de archivos
const currentFilePath = fileURLToPath(currentFileURL);
// Obtiene el directorio del archivo actual
const __dirname = dirname(currentFilePath);
global.__dirname = __dirname;
global.TEMP_PATH = path.join(__dirname, 'temp');
// global.PDF_TEMPLATES_PATH = path.join(__dirname, 'src', 'pdf_templates');
// global.PDF_PATH = path.join(__dirname, 'src', 'pdf');

// -------------- settings --------------
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());


// Aplicar los middlewares en orden
// app.use(express.static(path.join(__dirname, 'public')));


app.use('/app', appRoutes);


app.listen(process.env.PORT, () => console.log(`App running on http://localhost:${process.env.PORT}`))










