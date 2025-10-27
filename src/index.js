//https://www.youtube.com/watch?v=NmkY4JgS21A&t=3301s

import app from "./app.js";
import {connectDB} from "./db.js";

//Corre con --npm run dev--
connectDB();
app.listen(4000);
console.log("Server on port", 4000);