import express from 'express';
import auth from '../middleware/auth.js'

import { agregarCategoria, actualizarCategoria, subirArchivo, mostrarCategorias, mostrarCategoria } from '../controllers/categoriasController.js';
import {mostrarSubcategorias, eliminarSubcategoria,actualizarSubcategoria,agregarSubcategoria,mostrarSubcategoria, mostrarSubcategoriaDCat} from '../controllers/subcategoriasController.js'
import {agregarInspeccion, mostrarInspecciones, mostrarInspeccion} from '../controllers/inspeccionesController.js'
import { autenticarUsuario, registrarUsuario } from '../controllers/usuarioController.js';
//middle para proteger las rutas
auth
const router = express.Router();

router.get('/inicio', auth , (req,res) =>{
    res.send('inicio');
});

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




export default router;