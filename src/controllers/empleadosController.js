const EmpleadosShow = require('../models/empleadosShow');
const Empleados = require('../models/empleados');
const Banco = require('../models/banco');
const jwt = require ("jsonwebtoken");
const bcrypt = require ("bcrypt");
const moment = require ("moment")


const empleadosController = {

    registrarEmpleados: async (req ,res) => {

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
    
                const consultaNueva = await Empleados.findOne({ where:{n_cedula}})
    
                
                const {id} = consultaNueva.dataValues
                console.log(consultaNueva.dataValues)
                console.log(id)
                await Banco.create({
                    id_empleado: id,
                    nombre,
                    n_cedula,
                    haber: '0,00',
                    fecha: moment().format('DD/MM/YYYY'),
                    hora: moment().format('h:mm:ss a')
                });
    
                res.json({mensaje: 'Empleado creado correctamente'})
            } catch (error) {
                
                res.status(404).json({mensaje: 'Hubo un error', error: JSON.stringify(error)})
            
            }
    
        }else{
            res.status(404).json({mensaje: 'Usuario ya existe, comunicate con tu supervisor'})
        }      
    
    },

    autenticarEmpleados: async (req ,res, next) => {
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
                    expiresIn : '24h'
                });
    
                //retornar el token
                res.status(200).json({token})
            }
    
        }
    },

    mostrarEmpleadosPCategoria: async (req, res) =>{

        const id_categoria = req.params.idCategoria
    
        try {
            const empleadosCategoria = await EmpleadosShow.findAll({where: {id_categoria,estatus:'A'}})
            res.json(empleadosCategoria);
        } catch (error) {
            console.log(error)
            next();
        }
    
    },

    mostrarEmpleadosPSubcategoria: async (req, res) =>{

        const id_subcategoria = req.params.idSubcategoria
        const id_categoria = req.params.idCategoria
    
        try {
            const empleadosSubategoria = await EmpleadosShow.findAll({where: {id_categoria,id_subcategoria,estatus:'A'}})
            res.status(200).json(empleadosSubategoria);
        } catch (error) {
            console.log(error)
            res.status(404).json(error);
        }
    
    },

    mostrarEmpleado: async (req, res) =>{

        const id = req.params.id
    
        try {
            const empleado = await EmpleadosShow.findAll({where: {id}})
            res.json(empleado);
        } catch (error) {
            console.log(error)
            res.status(404).json(error);
        }
    
    },

    mostrarEmpleado: async (req, res) =>{

        const id = req.params.id
    
        try {
            const empleado = await EmpleadosShow.findAll({where: {id}})
            res.json(empleado);
        } catch (error) {
            console.log(error)
            res.status(404).json(error);
        }
    
    },
    
    mostrarEmpleados: async (req, res) =>{

        try {
            const empleado = await EmpleadosShow.findAll({})
            res.json(empleado);
        } catch (error) {
            console.log(error)
            next();
        }
    
    },

    actualizarCEmpleado: async (req, res) =>{

        const {average} = (req.body)
    
        const id = req.params.id
    
        try {
            const empleado = await EmpleadosShow.update({average},{where: {id} })
            res.json(empleado);
        } catch (error) {
            console.log(error)
            next();
        }
    
    },

    actualizarEstEmpleado: async (req, res) =>{

        const {estado} = (req.body)
        
    
        const id = req.params.id
    
        try {
    
            const empleado = await Empleados.update({estatus:estado},{where: {id}})
    
            res.json({mensaje: 'Actualizado Correctamente',
                      empleado});
        } catch (error) {
            console.log(error)
            next();
        }
    
    },

    mostrarEmpleadosEmail: async (req, res, next) => {

        const email = req.params.email
        try {
        const usuario = await EmpleadosShow.findOne({ where:{email}})
        res.status(200).json(usuario)
        } catch (error) {
            console.log(error)
            next();
        }
        
    
    },

} 

module.exports = empleadosController