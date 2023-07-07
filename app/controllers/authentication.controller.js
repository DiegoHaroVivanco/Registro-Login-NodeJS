import bcrypt from "bcryptjs";

const usuarios = [{
    user: "lio",
    email: "messi@gmail.com",
    password: "$2a$05$W8DBwVYGjv0BP0LlSlWvj.DM9nRfBndJrx8WOsgjD9Rv147lb5tNK"
}]


const login = async (req, res) =>{
    console.log(req.body)

    const user = req.body.user;
    const password = req.body.password;
    if(!user || !password){
        return res.status(400).send({status:"Error", message: "Campos sin valores"})
    }
    const userRevisado = usuarios.find(usuario =>  usuario.user === user);
    if(!userRevisado){
       return res.status(400).send({status:"Error", message: "Usuario y/o contraseña incorrectos"})
    }
    const loginCorrecto = await bcrypt.compare(password, userRevisado)
    


}


const registro = async (req, res) =>{
    //console.log(req.body)
    const user = req.body.user;
    const password = req.body.password;
    const email = req.body.email;
    if(!user || !password || !email){
        return res.status(400).send({status:"Error", message: "Campos sin valores"})
    }
    const userRevisado = usuarios.find(usuario =>  usuario.user === user);
    if(userRevisado){
       return res.status(400).send({status:"Error", message: "El usuario ingresado ya existe en el sistema"})

    }
    const salt = await bcrypt.genSalt(5); // 5 procesos de "salt" antes de encriptar la contraseña
    const hashPassword = await bcrypt.hash(password, salt)
    const nuevoUsuario = {
        user, email, password: hashPassword
    }
   // console.log(nuevoUsuario)
    usuarios.push(nuevoUsuario);
    //console.log(usuarios)
    return res.status(201).send({status: "ok", message:"usuario agregado", redirect: "/"})


}

export const methods = {
    login,
    registro
}