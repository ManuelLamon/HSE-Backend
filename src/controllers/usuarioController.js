const Usuario  = require ("../models/usuarios.js");
const UsuarioShow  = require ("../models/usuarioShow.js");
const jwt = require ("jsonwebtoken");
const bcrypt = require ("bcrypt");

const registrarUsuario = async (req ,res) => {

    const {nombre,telefono, email, direccion, rol, foto} = (req.body);
         
            let password = await bcrypt.hash(req.body.password, 12)  
    try {
        await Usuario.create({
            nombre,
            password,
            telefono,
            email,
            direccion,
            rol,
            foto
        });
        res.json({mensaje: 'Usuario creado correctamente'})
    } catch (error) {
        const {parent: {errno}} = error
        console.log(errno)
        if(errno === 1062){
            res.json({mensaje: `El Email ${email} ya existe, por favor use otro.`})
        }else{
            res.json({mensaje: 'Hubo un error'})
        }
        
    }

}

const autenticarUsuario = async (req ,res, next) => {
    //Buscar el usuario
    const {email, password} = req.body;

    const usuario = await Usuario.findOne({ where:{email}})

    if(!usuario){
        //El usuario no existe
        await res.status(401).json({mensaje: 'Ese usuario no existe'})
        next();
    }else{
        //El usuario existe, verificar si el password es correcto o incorrecto
        if(!bcrypt.compareSync(password, usuario.password)){
            //Si el password es incorrecto
            await res.status(401).json({mensaje: 'Contraseña incorrecta'})
            next();
        }else{
            //Password correcto, se crea un token
            const token = jwt.sign({
                email: usuario.email,
                nombre: usuario.nombre,
                rol: usuario.rol,
                id: usuario.id,
            }, 
            '*%HSE_07%*',
            {
                expiresIn : '1h'
            });

            //retornar el token
            res.json({token})
        }

    }
    
}

const mostrarUsuario = async (req, res, next) => {

    const email = req.params.email
    try {
    const usuario = await UsuarioShow.findOne({ where:{email}})
    res.json(usuario)
    } catch (error) {
        console.log(error)
        next();
    }
    

}
const mostrarUsuarioId = async (req, res, next) => {

    const id = req.params.id

    try {
    const usuario = await UsuarioShow.findOne({ where:{id}})
    res.json(usuario)
    } catch (error) {
        console.log(error)
        next();
    }
    

}

module.exports = {
    registrarUsuario,
    autenticarUsuario,
    mostrarUsuario,
    mostrarUsuarioId
}