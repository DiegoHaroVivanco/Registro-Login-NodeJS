const usuarios = [{
    user: "lio",
    email: "messi@gmail.com",
    password: "diez"
}]

const login = async (req, res) =>{

}


const registro = async (req, res) =>{
    console.log(req.body)
    const user = req.body.user;
    const password = req.body.password;
    const email = req.body.email;
    if(!user || !password || !email){
        res.status(400).send({status:"Error", message: "Campos sin valores"})
    }
    const userRevisado = usuarios.find(usuario =>  usuario.user === user);
    if(userRevisado){
        res.status(400).send({status:"Error", message: "El usuario ingresado ya existe en el sistema"})

    }

}

export const methods = {
    login,
    registro
}