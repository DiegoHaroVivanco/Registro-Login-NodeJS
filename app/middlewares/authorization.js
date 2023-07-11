import jsonWebToken from "jsonwebtoken";
import dotenv from "dotenv"
import {usuarios} from "../controllers/authentication.controller.js";
dotenv.config();

const checkAdmin = (req, res, next) =>{
    const logueadoOk = checkCookie(req);
    if(logueadoOk)
        return next();

    return res.redirect("/");

}


const checkPublico = (req, res, next) =>{
    const logueadoOk = checkCookie(req);
    if(!logueadoOk)
        return next();

    return res.redirect("/administrador");
}

const checkCookie = (req) =>{
    try {
        const cookie = req.headers.cookie.split("; ").
                        find(cookie => cookie.startsWith("jwt=")).
                        slice(4);
        const cookieDeco = jsonWebToken.verify(cookie, process.env.JWT_SECRET)
        console.log(cookieDeco)
    
        const userRevisado = usuarios.find(usuario =>  usuario.user === cookieDeco.user);
        console.log("Usuario Revisado: ", userRevisado)
        
        if(!userRevisado)
            return false;
    
        return true;

    } catch (error) {
        return false;
    }
    
}


export const methods = {
    checkAdmin,
    checkPublico
}