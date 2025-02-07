import { validateToken } from "./modules/utils.mjs";

export async function obtenerInfo(req, res) {
    console.log("Obteniendo Info");
    const authHeader = req.headers['authorization']; 
    if (authHeader) { 
        const token = authHeader.split(' ')[1]; // Assuming 'Bearer <token>' 
        const decodedToken = validateToken(token);
        if(decodedToken){
            let response = await getAppInfo(decodedToken.user.id);
            console.log(response);
            return res.status(200).json({success: response.success, results: response.results, error: response.error});
        }
    } else { 
        return res.status(401).json({success: false, results: {}, error: 'Token no válido'});
    }   
}