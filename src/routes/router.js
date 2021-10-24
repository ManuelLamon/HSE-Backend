const express = require ('express');


const { agregarCategoria, actualizarCategoria, subirArchivo, mostrarCategorias, mostrarCategoria } = require ('../controllers/categoriasController.js');
const {mostrarSubcategorias, eliminarSubcategoria,actualizarSubcategoria,agregarSubcategoria,mostrarSubcategoria, mostrarSubcategoriaDCat} = require ('../controllers/subcategoriasController.js');
const {agregarInspeccion, mostrarInspecciones, mostrarInspeccion, mostrarInspeccionesUser, EliminarInspeccion} = require ('../controllers/inspeccionesController.js');
const {mostrarCalificaciones, agregarCalificacion,eliminarCalificacion} = require ('../controllers/calificacionesController.js');
const {autenticarUsuario, registrarUsuario, mostrarUsuario, mostrarUsuarioId, mostrarUsuarios} = require ('../controllers/usuarioController.js');
const {mostrarEmpleadosPCategoria, mostrarEmpleadosPSubcategoria, mostrarEmpleado, actualizarCEmpleado, mostrarEmpleados, actualizarEstEmpleado,registrarEmpleados,autenticarEmpleados,mostrarEmpleadosEmail}  = require('../controllers/empleadosControlles.js')

//middle para proteger las rutas
const auth = require( '../middleware/auth.js');

const router = express.Router();

//Sesión
router.post('/crear-cuenta', registrarUsuario);
router.post('/iniciar-sesion', autenticarUsuario);

//Mostrar usuario
router.get('/usuarios',mostrarUsuarios)
router.get('/usuario/:email',auth,mostrarUsuario)

//Sesión Empleados
//Por hacer: Registrar empleado
router.post('/crear-cuenta/empleados', registrarEmpleados);
router.post('/iniciar-sesion/empleados', autenticarEmpleados);
//Iniciar sesion de empleado

//Mostrar Empleados
router.get('/empleados',mostrarEmpleados)
router.get('/empleados/:idCategoria',auth,mostrarEmpleadosPCategoria)
router.get('/empleados/:idCategoria/:idSubcategoria',auth,mostrarEmpleadosPSubcategoria)
router.get('/empleado/:id',auth,mostrarEmpleado)
router.get('/empleadoEmail/:email',auth,mostrarEmpleadosEmail)
router.put('/empleado/puntuacion/:id',actualizarCEmpleado)
router.put('/empleado/estado/:id',actualizarEstEmpleado)

//Categorias
router.get('/categorias', mostrarCategorias);
router.get('/categorias/:idCategoria', auth,mostrarCategoria);
router.put('/categorias/:idCategoria',subirArchivo ,actualizarCategoria);
router.post('/categorias', subirArchivo ,agregarCategoria);

//Subcategoria
router.get('/subcategorias', mostrarSubcategorias);
router.get('/subcategorias/:idSubcategoria', auth,mostrarSubcategoria);
router.get('/subcategorias/categoria/:idCategoria', auth,mostrarSubcategoriaDCat);
router.post('/subcategorias', auth,agregarSubcategoria);
router.put('/subcategorias/:idSubcategoria', auth,actualizarSubcategoria);
router.delete('/subcategorias/:idSubcategoria',auth, eliminarSubcategoria);

//Inspecciones
router.get('/inspecciones', mostrarInspecciones);
router.post('/inspecciones',auth, agregarInspeccion);
router.get('/inspecciones/:idInspeccion', mostrarInspeccion);
router.delete('/inspecciones/:idInspeccion',auth, EliminarInspeccion);
router.get('/inspecciones/user/:idUser',auth, mostrarInspeccionesUser);


//Calificacion
 router.post('/calificacion',auth, agregarCalificacion);
 router.get('/calificacion/:idEmpleado',auth, mostrarCalificaciones);
 router.delete('/calificacion/:id',auth, eliminarCalificacion);


module.exports = router;