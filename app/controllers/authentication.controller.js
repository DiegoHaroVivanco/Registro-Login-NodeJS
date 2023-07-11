import bcrypt from "bcryptjs";
import jsonWebToken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const usuarios = [{
    user: "lio",
    email: "messi@gmail.com",
    password: "$2a$05$W8DBwVYGjv0BP0LlSlWvj.DM9nRfBndJrx8WOsgjD9Rv147lb5tNK"
}]


const login = async (req, res) =>{
    console.log(req.body)

    try {
        console.log(req.body)

        const user = req.body.user;
        const password = req.body.password;
        if(!user || !password)
            return res.status(400).send({status:"Error", message: "Campos sin valores"})
        
        const userRevisado = usuarios.find(usuario =>  usuario.user === user);
        if(!userRevisado)
           return res.status(401).send({status:"Error", message: "Usuario y/o contraseña incorrectos"})
        
        const loginCorrecto = await bcrypt.compare(password, userRevisado.password)
        if(loginCorrecto){
    
            // Si el login es correcto, generamos un token
            const token = jsonWebToken.sign(
                {user:userRevisado.user},
                process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRED})
        
            const cookieOption = {
                expires: new Date(Date.now()+ process.env.JWT_COOKIE_EXPIRED * 24*60*1000), // lo convierto en días
                path: "/"
            }
            res.cookie("jwt",token, cookieOption)
            return res.send({status:"ok", message: "Usuario loggeado correctamente", redirect:"./administrador"})   
        }
        return res.status(401).send({status:"Error", message: "Usuario y/o contraseña incorrectos"})
    
    } catch (error) {
        res.status(400).send({status:"Error",message:error});
    }

}


const registro = async (req, res) =>{

    const user = req.body.user;
    const password = req.body.password;
    const email = req.body.email;
    if(!user || !password || !email)
        return res.status(400).send({status:"Error", message: "Campos incompletos"})
    
    const userRevisado = usuarios.find(usuario =>  usuario.user === user);
    if(userRevisado)
       return res.status(301).send({status:"Error", message: "El usuario ingresado ya existe en el sistema"})

    
    const salt = await bcrypt.genSalt(5); // 5 procesos de "salt" antes de encriptar la contraseña
    const hashPassword = await bcrypt.hash(password, salt)
    const nuevoUsuario = {
        user, email, password: hashPassword
    }
    usuarios.push(nuevoUsuario);
    console.log(usuarios)

    return res.status(201).send({status: "ok", message:"usuario agregado", redirect: "/"})


}

export const methods = {
    login,
    registro
}