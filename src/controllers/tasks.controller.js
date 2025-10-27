// 01:22:40

import Task from "../models/task.model.js";      // 01:24:10 // 01:26:05

export const getTasks = async (req,res) => {
    const tasks = await Task.find({
        user: req.user.id
    }).populate('user')    //01:36:34
    //populate Completa el campo user con todos sus datos 
    res.json(tasks);
};
    
// 01:27:00

export const createTask = async (req,res) => { //1:26:55
    const { title, description, date } = req.body;    // CREA CONSTANTES CON DATOS TOMADOS DEL body DE req 
    
    //console.log(req.user)   //01:34:32
    //DEVUELVE --> { id: '682207f1f88e6bce5749ece2', iat: 1747407240, exp: 1747493640 }
    
    const newTask = new Task({
        title,          // title = title;
        description,    // description = description;
        date,            // date = date;
        user: req.user.id   //Tenemos el user xq el authRequired lo trae
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
};

// 01:27:30
export const getTask = async (req,res) => {
    //const task = await Task.findById(req.params.id)  //01:27:56 //
    const task = await Task.findById(req.params.id).populate('user') //??  //01:37:00
    // req.params.id es el dato de la url que le estoy pasando desde task.routes.js
    if(!task) return res.status(404).json({message: "Task not found"})
    //res.json(task) No es necesario que envie un response
    return res.sendStatus(204); // el status 204 Indica todo estuvo bien
}; 

// 01:28:30
export const deleteTask = async (req,res) => {
    const task = await Task.findByIdAndDelete(req.params.id)  
    if(!task) return res.status(404).json({message: "Task not found"})
    res.json(task)
}

// 01:30:31
export const updateTask = async (req,res) => {
    //"new" xq el mongoose update devuelve el dato viejo
    const task = await Task.findByIdAndUpdate(req.params.id, req.body,{new: true})  
    if(!task) return res.status(404).json({message: "Task not found"})
    res.json(task)
}