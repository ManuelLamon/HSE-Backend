const EmpleadosShow = require('../models/empleadosShow');
const Empleados = require('../models/empleados');
const jwt = require ("jsonwebtoken");
const bcrypt = require ("bcrypt");



const registrarEmpleados = async (req ,res) => {

    const {nombre,n_cedula,usuario,direccion,telefono,average,etiqueta,id_categoria,id_subcategoria,email,rol,descripcion,estado} = (req.body);
         
            let password = await bcrypt.hash(req.body.password, 12)  
            let foto = req.body.foto === '' || req.body.foto === null || req.body.foto === undefined ?'default_image.png':req.body.foto

    const consultaUsuaurio = await Empleados.findOne({ where:{n_cedula}})

    if(!consultaUsuaurio){

        try {
            await Empleados.create({
                nombre,
                n_cedula,
                usuario,
                password,
                telefono,
                email,
                direccion,
                rol,
                foto,
                average,
                etiqueta,
                id_categoria,
                id_subcategoria,
                descripcion,
                estado
            });
            res.json({mensaje: 'Empleado creado correctamente'})
        } catch (error) {
            
            res.status(404).json({mensaje: 'Hubo un error', error})
        
        }

    }else{
        res.status(404).json({mensaje: 'Usuario ya existe, comunicate con tu supervisor'})
    }
            
    

}

const autenticarEmpleados = async (req ,res, next) => {
    //Buscar el usuario
    const {email, password} = req.body;

    const user = await Empleados.findOne({ where:{email}})

    if(!user){
        //El usuario no existe
        res.status(401).json({mensaje: 'Ese usuario no existe'})
        
    }else{
        //El usuario existe, verificar si el password es correcto o incorrecto
        if(!bcrypt.compareSync(password, user.password)){
            //Si el password es incorrecto
             res.status(401).json({mensaje: 'Contraseña incorrecta'})
           
        }else{
            //Password correcto, se crea un token
            const token = jwt.sign({
                email: user.email,
                nombre: user.nombre,
                rol: user.rol,
                id: user.id,
            }, 
            '*%HSE_07%*',
            {
                expiresIn : '1h'
            });

            //retornar el token
            res.status(200).json({token})
        }

    }
}
    

const mostrarEmpleadosPCategoria = async (req, res) =>{

    const id_categoria = req.params.idCategoria

    try {
        const empleadosCategoria = await EmpleadosShow.findAll({where: {id_categoria}})
        res.json(empleadosCategoria);
    } catch (error) {
        console.log(error)
        next();
    }

}
const mostrarEmpleadosPSubcategoria = async (req, res) =>{

    const id_subcategoria = req.params.idSubcategoria
    const id_categoria = req.params.idCategoria

    try {
        const empleadosSubategoria = await EmpleadosShow.findAll({where: {id_categoria,id_subcategoria}})
        res.json(empleadosSubategoria);
    } catch (error) {
        console.log(error)
        next();
    }

}
const mostrarEmpleado = async (req, res) =>{

    const id = req.params.id

    try {
        const empleado = await EmpleadosShow.findAll({where: {id}})
        res.json(empleado);
    } catch (error) {
        console.log(error)
        next();
    }

}

const mostrarEmpleados = async (req, res) =>{

    try {
        const empleado = await EmpleadosShow.findAll({})
        res.json(empleado);
    } catch (error) {
        console.log(error)
        next();
    }

}

const actualizarCEmpleado = async (req, res) =>{

    const {average} = (req.body)

    const id = req.params.id

    try {
        const empleado = await EmpleadosShow.update({average},{where: {id} })
        res.json(empleado);
    } catch (error) {
        console.log(error)
        next();
    }

}

const actualizarEstEmpleado = async (req, res) =>{

    const {estado} = (req.body)

    const id = req.params.id

    try {
        const empleado = await EmpleadosShow.update({estado},{where: {id} })
        res.json({mensaje: 'Autualizado Correctamente',
                  empleado});
    } catch (error) {
        console.log(error)
        next();
    }

}

const mostrarEmpleadosEmail = async (req, res, next) => {

    const email = req.params.email
    try {
    const usuario = await EmpleadosShow.findOne({ where:{email}})
    res.status(200).json(usuario)
    } catch (error) {
        console.log(error)
        next();
    }
    

}

module.exports = {
    mostrarEmpleadosPCategoria,
    mostrarEmpleadosPSubcategoria,
    mostrarEmpleado,
    actualizarCEmpleado,
    mostrarEmpleados,
    actualizarEstEmpleado,
    registrarEmpleados,
    autenticarEmpleados,
    mostrarEmpleadosEmail
}