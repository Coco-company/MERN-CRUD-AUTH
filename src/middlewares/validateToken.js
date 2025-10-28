//MIDDLEWARES ---> funciones que se ejecuntan antes de llegar a una ruta
// 01:04:45
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => {   //requiere los 3 parametros para ser middleware (está en el medio)
// req -> me da informacion de la aplicacion // res -> metodos para enviar una respuesta // next -> continua con la funcion siguiente
    //console.log("validating token")
    //console.log(req.headers); // 01:08:20
    //const cookies = req.headers.cookie;    //Solo Cookie
    //const cookies = req.cookie;            //Tambien solo Cookie

    const {token} = req.cookies;    // es igual a: const token = req.cookies.token;
    //console.log(token)

    if(!token) 
        return res.status(401).json({ message: "No token, autorizacion denegada"});
        jwt.verify(token, TOKEN_SECRET, (err, user) => {
            if(err) return res.status(403).json({ message: "Token invalido" });
            //console.log(user)
    
            req.user = user     // 01:15:30 "req" petición que está llegando 

            next() //Es una suerte de "return" pero continua en la siguiente funcion
        }) 

}