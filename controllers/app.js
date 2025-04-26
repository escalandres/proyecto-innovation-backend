import { db_registrarPrenda, db_obtenerPrendas } from "./modules/database.mjs";

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