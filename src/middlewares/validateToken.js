//MIDDLEWARES ---> funciones que se ejecuntan antes de llegar a una ruta

import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => {   //requiere los 3 parametros para ser middleware (está en el medio)
// req -> me da informacion de la aplicacion // res -> metodos para enviar una respuesta // next -> continua con la funcion siguiente
    //console.log("validating token")
    //console.log(req.headers);

    //const cookies = req.headers.cookie;
    const {token} = req.cookies;    // es igual a: const token = req.cookies.token;
    //console.log(token)

    if(!token) 
        return res.status(401).json({ message: "No token, autorizacion denegada"});
        jwt.verify(token, TOKEN_SECRET, (err, user) => {
            if(err) return res.status(403).json({ message: "Token invalido" })
            //console.log(user)
    
            req.user = user

            next() //Es una suerte de "return" pero continua en la siguiente funcion
        }) 

}