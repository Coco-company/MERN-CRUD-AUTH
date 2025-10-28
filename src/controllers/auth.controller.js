//export const register = (req, res) => res.send("register");   //Ejemplo inicial nuestra "register" en el HTML
//export const login = (req, res) => res.send("login");         //Ejemplo inicial nuestra "login" en el HTML
import User from "../models/user.model.js"; //Importamos el modelo de usuario (Simil clase(?))
import bcrypt from "bcryptjs";
import {createAccessToken} from '../libs/jwt.js'

// ------------------------- REGISTRO --------------------------

//MODELO DE PRUEBA
// THunder client >>> Body > Json
// [POST] http://localhost:4000/api/register

/*{  
 "email":"test01@test.com",   
 "password": "test01",
 "username": "test01"
}*/

export const register = async (req, res) => {
    const {email,password,username} = req.body
    //console.log(req.body)
    //console.log(email, password, username)
    //creacion token 00:39:42
    try {

        const passwordHash = await bcrypt.hash(password,10);

        const newUser = new User({   //User.create({})
            username,       // usename: usename
            email,          // email: email
            password: passwordHash
        });
        
        const userSaved = await newUser.save();
        const token = await createAccessToken({id: userSaved._id})

        res.cookie('token',token); //cookie metodo de Express
        //res.json({  message: "User created succesfully"    })
        
        //res.json(userSaved);  //Muestra todo el usuario 
         res.json({               //como para el front end no voy a necesitar el pass
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        });  
        //res.send('registrando') //Escribe 'registrando' en el cuerpo del HTML
        
    } catch (error) {
        //console.log(error);
        res.status(500).json({ message: error.message});
    }
    //console.log(newUser)
};

//export const login = (req, res) => res.send("login");

// -------------------------- LOGEO --------------------------
// 00:55:00 

//MODELO DE PRUEBA
// THunder client >>> Body > Json
// [POST] http://localhost:4000/api/login

/*{
 "email":"test01@test.com",   
 "password": "test01"
}*/

export const login = async (req, res) => {
    const {email,password} = req.body
    //console.log(req.body)
    //console.log(email, password, username)
    
    try {
        const userFound = await User.findOne({email});
        if(!userFound) return res.status(400).json({ message: "Usuario no encontrado" });
        
        const isMatch = await bcrypt.compare(password, userFound.password);
        if(!isMatch) return res.status(400).json({ message: "Contraseña Incorrecta" });
        // CREAMOS TOKEN 00:58:00
        const token = await createAccessToken({id: userFound._id});

        res.cookie("token",token); //cookie metodo de Express

        //      01:00:00
        res.json({               //como para el front end no voy a necesitar el pass
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });  
        //res.send('registrando') //Escribe 'registrando' en el cuerpo del HTML
        
    } catch (error) {
        //console.log(error);
        res.status(500).json({ message: error.message});
    }
    //console.log(newUser)
   
}

// -------------------------- DESLOGEO --------------------------
//01:00:38 
export const logout = (req, res) => {
    res.cookie('token', "", {   //Blanqueo y Elimino la Cookie
        expires: new Date (0)
    })
    return res.sendStatus(200);
}

// -------------------------- RUTA PROTEGIDA --------------------------
export const profile = async (req, res) => {
    //console.log(req.user)           
    const userFound = await User.findById(req.user.id) //01:16:30

    if(!userFound) return res.status(400).json({ message: "user not found" });

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })
    //res.send('profile')
}