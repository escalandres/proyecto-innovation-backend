import jwt from 'jsonwebtoken';


export function validateToken(token) { 
    try { 
        const decodedToken = jwt.verify(token, process.env.KEY); 
        // console.log('Token válido'); 
        // Puedes realizar acciones adicionales con el decodedToken aquí 
        return decodedToken; 
    } catch (error) { 
        console.error('Token no válido:', error.message); // Maneja el error según sea necesario 
        return null; 
    } 
};