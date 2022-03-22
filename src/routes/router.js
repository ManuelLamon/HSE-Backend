const express = require ('express');


const { agregarCategoria, actualizarCategoria, subirArchivo, mostrarCategorias, mostrarCategoria } = require ('../controllers/categoriasController.js');
const {mostrarSubcategorias, eliminarSubcategoria,actualizarSubcategoria,agregarSubcategoria,mostrarSubcategoria, mostrarSubcategoriaDCat} = require ('../controllers/subcategoriasController.js');
const inspeccionesController = require ('../controllers/inspeccionesController.js');
const {mostrarCalificaciones, agregarCalificacion,eliminarCalificacion} = require ('../controllers/calificacionesController.js');
const {autenticarUsuario, registrarUsuario, mostrarUsuario, mostrarUsuarioId, mostrarUsuarios} = require ('../controllers/usuarioController.js');
const  empleadosController  = require('../controllers/empleadosController.js')
const Bancos = require("../controllers/bancosController.js")

//middle para proteger las rutas
const auth = require( '../middleware/auth.js');

const router = express.Router();

//Sesión
router.post('/crear-cuenta', registrarUsuario);
router.post('/iniciar-sesion', autenticarUsuario);

//Mostrar usuario
router.get('/usuarios',mostrarUsuarios)
router.get('/usuario/:email',auth,mostrarUsuario)
router.get('/usuario/user/:id',mostrarUsuarioId)

//Sesión Empleados
//Por hacer: Registrar empleado
router.post('/crear-cuenta/empleados', empleadosController.registrarEmpleados);
//Iniciar sesion de empleado
router.post('/iniciar-sesion/empleados', empleadosController.autenticarEmpleados);
//Iniciar sesion Admin APP
router.post('/iniciar-sesion/adminApp', empleadosController.autenticarEmpleadosSupervisores);

//Mostrar Empleados
router.get('/empleados',empleadosController.mostrarEmpleados)
router.get('/empleados/:idCategoria',empleadosController.mostrarEmpleadosPCategoria)
router.get('/empleados/:idCategoria/:idSubcategoria',empleadosController.mostrarEmpleadosPSubcategoria)

router.get('/empleado/:id',empleadosController.mostrarEmpleado)
router.get('/empleadoEmail/:email',auth,empleadosController.mostrarEmpleadosEmail)
router.put('/empleado/puntuacion/:id',empleadosController.actualizarCEmpleado)
router.put('/empleado/estado/:id',empleadosController.actualizarEstEmpleado)

//Categorias
router.get('/categorias', mostrarCategorias);
router.get('/categorias/:idCategoria', mostrarCategoria);
router.put('/categorias/:idCategoria',subirArchivo ,actualizarCategoria);
router.post('/categorias', subirArchivo ,agregarCategoria);

//Subcategoria
router.get('/subcategorias', mostrarSubcategorias);
router.get('/subcategorias/:idSubcategoria',mostrarSubcategoria);
router.get('/subcategorias/categoria/:idCategoria', auth,mostrarSubcategoriaDCat);
router.post('/subcategorias', auth,agregarSubcategoria);
router.put('/subcategorias/:idSubcategoria', auth,actualizarSubcategoria);
router.delete('/subcategorias/:idSubcategoria',auth, eliminarSubcategoria);

//Inspecciones
router.get('/inspecciones', inspeccionesController.mostrarInspecciones);
router.post('/inspecciones',auth, inspeccionesController.agregarInspeccion);
router.get('/inspecciones/:idInspeccion', inspeccionesController.mostrarInspeccion);
router.delete('/inspecciones/:idInspeccion',auth, inspeccionesController.EliminarInspeccion);
router.get('/inspecciones/user/:idUser',auth, inspeccionesController.mostrarInspeccionesUser);
router.get('/inspecciones/empleado/:idEmpleado', inspeccionesController.mostrarInspeccionesEmpleado);
router.put('/inspecciones/actualizarInspeccion', inspeccionesController.actualizarInspeccion);
router.put('/inspecciones/aggEmpleadoConsulta', inspeccionesController.aggEmpleadoConsulta);


//Calificacion
 router.post('/calificacion',auth, agregarCalificacion);
 router.get('/calificacion/:idEmpleado',auth, mostrarCalificaciones);
 router.delete('/calificacion/:id',auth, eliminarCalificacion);

 //Bancos
 router.get('/bancos/:idEmpleado', Bancos.mostrarBancoPorEmpleado);
 router.get('/bancos/solicitud/mostrarSolicitudes', Bancos.mostrarSolicitudes);
 router.post('/bancos/solicitud/mostrarSolicitudesPorEmpleados', Bancos.mostrarSolicitudesPorEmpleados);
 router.post('/bancos/solicitud/InsertarSolicitudDePago', Bancos.InsertarSolicitudDePago);
 router.post('/bancos/solicitud/pagarAEmpleados', Bancos.pagarAEmpleados);


module.exports = router;
