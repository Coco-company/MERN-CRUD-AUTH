//01:19:25
import {Router} from 'express';
import { authRequired } from '../middlewares/validateToken.js';  //modulo de autorizacion
import {getTasks,getTask,createTask,updateTask,deleteTask} from '../Controllers/tasks.controller.js';

const router = Router();

//router.get('/tasks', authRequired, (req, res) => res.send('tasks'))     //Módulo authRequired
router.get('/tasks', authRequired, getTasks);     //Módulo authRequired
router.get('/tasks/:id', authRequired, getTask);        //Módulo authRequired
router.post('/tasks', authRequired, createTask);
router.delete('/tasks/:id', authRequired, deleteTask);
router.put('/tasks/:id', authRequired, updateTask);



export default router;  