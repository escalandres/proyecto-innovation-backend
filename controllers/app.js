import { db_registrarPrenda, db_obtenerPrendas } from "./modules/database.mjs";
import multer from "multer";
import path from "path";
import fs from "fs";
import FormData from "form-data";
import axios from "axios";

export async function registrarPrenda(req, res){
    try {
        const { item } = req.body;
        console.log('item:', item);
        const result = await db_registrarPrenda(item);
        if(!result.success){
            return res.status(400).json({success: false, message: result.error})
        }else{
            return res.status(200).json({success: true, message: result.result})
        }
    } catch (error) {
        console.error('Ocurrio un error:',error);
        // Enviar respuesta JSON indicando fallo
        res.status(400).json({ success: false , message: "Error al guardar coordenadas"});
    }
}

export async function obtenerPrendas(req, res){
    try{
        const result = await db_obtenerPrendas();
        if(!result.success){
            return res.status(400).json({success: false, message: result.error, items: result.items})
        }else{
            return res.status(200).json({success: true, message: result.result, items: result.items})
        }
    }catch(error){
        console.error('Ocurrio un error:',error);
        // Enviar respuesta JSON indicando fallo
        res.status(400).json({ success: false , message: "Error al guardar coordenadas"});
    }
}

// Configuración de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, TEMP_PATH); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada archivo
    },
});

export const upload = multer({ storage });

// Configuración de multer
const storage2 = multer.memoryStorage(); // Usar memoria para evitar guardar en disco
export const upload2 = multer({ storage2 });

export async function subirFoto(req, res){
    try{
        // Crear la carpeta temp si no existe
        const tempDir = TEMP_PATH;
        if (!fs.existsSync(tempDir)){
            fs.mkdirSync(tempDir);
        }

        if (!req.file) {
            return res.status(400).send('No se ha subido ninguna imagen.');
        }
        res.send('Imagen subida con éxito: ' + req.file.filename);


        // const result = await db_obtenerPrendas();
        // if(!result.success){
        //     return res.status(400).json({success: false, message: result.error, items: result.items})
        // }else{
        //     return res.status(200).json({success: true, message: result.result, items: result.items})
        // }
    }catch(error){
        console.error('Ocurrio un error:',error);
        // Enviar respuesta JSON indicando fallo
        res.status(400).json({ success: false , message: "Error al guardar coordenadas"});
    }
}

export async function enviarFotoAlgoritmo(req, res){
    try{
        console.log('req.file:', req.file);
        let fileName = req.file.filename;
        // Lee el archivo si está en disco
        const filePath = path.join(TEMP_PATH, fileName);
        const fileBuffer = fs.readFileSync(filePath);
        // Crear un FormData para enviar la imagen a otra API
        const form = new FormData();
        form.append('imagen', fileBuffer, {
            filename: 'image.jpg', // Nombre del archivo
            contentType: req.file.mimetype, // Tipo de contenido
        });
        
        // Enviar la imagen a la API externa
        const response = await axios.post('http://localhost:8000/api/face/reconocer/', form, {
            headers: {
                ...form.getHeaders(), // Añadir los headers de FormData
            },
        });
        // console.log('Respuesta:', response);
        let data = await response.data;
        console.log('Respuesta de la API:', data);
        borrarImagenTemp(fileName);
        // Devolver la respuesta de la API externa
        if(response.status !== 200){
            return res.status(400).json({success: false, message: response.error})
        }else{
            return res.status(200).json({success: true, message: data})
        }
    }catch(error){
        console.error('Ocurrio un error:',error);
        // Enviar respuesta JSON indicando fallo
        res.status(400).json({ success: false , message: "Error al guardar coordenadas"});
    }
}


function borrarImagenTemp(nombreArchivo) {
    const rutaImagen = path.join(TEMP_PATH, nombreArchivo); // Asegúrate de que TEMP_PATH esté definido

    // Verificar si el archivo existe antes de intentar eliminarlo
    if (fs.existsSync(rutaImagen)) {
        fs.unlink(rutaImagen, (error) => {
            if (error) {
                console.error('Error al borrar la imagen:', error);
            } else {
                console.log('Imagen eliminada correctamente:', rutaImagen);
            }
        });
    } else {
        console.log('La imagen no existe:', rutaImagen);
    }
}

// Ejemplo de uso
