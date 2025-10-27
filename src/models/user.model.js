import mongoose from "mongoose";


//ESTE ES EL MODELO DE ESQUEMA DE DATOS PARA USER

const userSchema = new mongoose.Schema({
    username:  {
        type: String,
        required: true,
        trim: true  //esto limpia el texto en el campo de ingreso
    },
    email:  {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:  {
        type: String,
        required: true
    }
},{
    timestamps: true
})

export default mongoose.model('User', userSchema);