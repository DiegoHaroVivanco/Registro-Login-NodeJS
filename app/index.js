import express from "express";
const PORT = 8080;

//Para __dirname
import path from 'path';
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.listen(PORT, ()=> {
    //console.log('\x1Bc'); //esta linea limpia la pantalla antes de volver a ejectuar la aplicacion por cada cambio
    console.log(`Servidor corriendo en el puerto: ${PORT}`)
    console.log('\x1b[34m%s\x1b[0m', 'Acceder desde [Ctrl + Clic ] ==>','\x1b[32m\x1b[0m',` http://localhost:${PORT} \r`);
    console.log('\x1b[31m%s\x1b[0m', ' Para salir precione en esta ventana [Ctrl + C ]      \r\n');
});


app.use(express.static(__dirname + '/public'));

//Rutas
app.get("/", (req, res)=> res.sendFile(__dirname+"/pages/login.html"))
app.get("/registro", (req, res)=> res.sendFile(__dirname+"/pages/registro.html"))
app.get("/administrador", (req, res)=> res.sendFile(__dirname+"/pages/admin/admin.html"))
