const express = require ('express');
const auth = require( '../middleware/auth.js');

const { agregarCategoria, actualizarCategoria, subirArchivo, mostrarCategorias, mostrarCategoria } = require ('../controllers/categoriasController.js');
const {mostrarSubcategorias, eliminarSubcategoria,actualizarSubcategoria,agregarSubcategoria,mostrarSubcategoria, mostrarSubcategoriaDCat} = require ('../controllers/subcategoriasController.js');
const {agregarInspeccion, mostrarInspecciones, mostrarInspeccion} = require ('../controllers/inspeccionesController.js');
const {mostrarCalificaciones, agregarCalificacion} = require ('../controllers/calificacionesController.js');
const {autenticarUsuario, registrarUsuario } = require ('../controllers/usuarioController.js');

//middle para proteger las rutas
auth

const router = express.Router();

//Sesión
router.post('/crear-cuenta', registrarUsuario);
router.post('/iniciar-sesion', autenticarUsuario);

//Sesión Empleados

//Categorias
router.get('/categorias', mostrarCategorias);
router.get('/categorias/:idCategoria', mostrarCategoria);
router.put('/categorias/:idCategoria', subirArchivo ,actualizarCategoria);
router.post('/categorias', subirArchivo ,agregarCategoria);

//Subcategoria
router.get('/subcategorias', mostrarSubcategorias);
router.get('/subcategorias/:idSubcategoria', mostrarSubcategoria);
router.get('/subcategorias/categoria/:idCategoria', mostrarSubcategoriaDCat);
router.post('/subcategorias', agregarSubcategoria);
router.put('/subcategorias/:idSubcategoria', actualizarSubcategoria);
router.delete('/subcategorias/:idSubcategoria', eliminarSubcategoria);

//Inspecciones
router.get('/inspecciones', mostrarInspecciones);
router.post('/inspecciones', agregarInspeccion);
router.get('/inspecciones/:idInspeccion', mostrarInspeccion);

//Calificacion
 router.post('/calificacion', agregarCalificacion);
 router.get('/calificacion/:idEmpleado', mostrarCalificaciones);


module.exports = router;