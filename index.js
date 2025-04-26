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

// -------------- settings --------------
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());


// Aplicar los middlewares en orden
// app.use(express.static(path.join(__dirname, 'public')));


app.use('/app', appRoutes);


app.listen(process.env.PORT, () => console.log(`App running on http://localhost:${process.env.PORT}`))










