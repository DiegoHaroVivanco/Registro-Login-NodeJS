import express from "express";
import cookieParser from "cookie-parser";
const PORT = 8080;

//Para __dirname
import path from 'path';
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { methods as authentication} from "./controllers/authentication.controller.js";
import { methods as authorization } from "./middlewares/authorization.js";

const app = express();

app.listen(PORT, ()=> {
    //console.log('\x1Bc'); //esta linea limpia la pantalla antes de volver a ejectuar la aplicacion por cada cambio
    console.log(`Servidor corriendo en el puerto: ${PORT}`)
    console.log('\x1b[34m%s\x1b[0m', 'Acceder desde [Ctrl + Clic ] ==>','\x1b[32m\x1b[0m',` http://localhost:${PORT} \r`);
    console.log('\x1b[31m%s\x1b[0m', ' Para salir precione en esta ventana [Ctrl + C ]      \r\n');
});


app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(cookieParser())


//Rutas
app.get("/", authorization.checkPublico,(req, res)=> res.sendFile(__dirname+"/pages/login.html"))
app.get("/registro", authorization.checkPublico,(req, res)=> res.sendFile(__dirname+"/pages/registro.html"))
app.get("/administrador",authorization.checkAdmin, (req, res)=> res.sendFile(__dirname+"/pages/admin/admin.html"))
app.post("/api/registro", authentication.registro)
app.post("/api/login", authentication.login)