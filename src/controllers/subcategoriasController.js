import Subcategoria from '../models/subcategorias.js'

export const mostrarSubcategorias = async(req, res, next) => {
    try {
        const subcategoria = await Subcategoria.findAll({})
        res.json(subcategoria);
    } catch (error) {
        console.log(error)
        next();
    }
}

export const mostrarSubcategoria = async(req, res, next) => {
    const id = req.params.idSubcategoria
    try {
        const subcategoria = await Subcategoria.findAll({where: {id}})
        res.json(subcategoria);
    } catch (error) {
        console.log(error)
        next();
    }
}

export const mostrarSubcategoriaDCat = async(req, res, next) => {
    const id_categoria = req.params.idCategoria
    try {
        const subcategoria = await Subcategoria.findAll({where: {id_categoria}})
        res.json(subcategoria);
    } catch (error) {
        console.log(error)
        next();
    }
}

export const agregarSubcategoria = async(req, res, next) => {
    
    const {nombre, id_categoria} = (req.body);

    try {
        const subcategoria = await Subcategoria.create({nombre, id_categoria})
        res.json({mensaje: 'Subcategoria creada correctamente'})
    } catch (error) {
        console.log(error)
        next();
    }
}

export const actualizarSubcategoria = async(req, res, next) => {
    
    const {nombre, id_categoria} = (req.body);
    const id = req.params.idSubcategoria

    try {
        const subcategoria = await Subcategoria.update({nombre, id_categoria},{where : {id}})
        res.json({mensaje: 'Subcategoria editado correctamente'})
    } catch (error) {
        console.log(error)
        next();
    }
}

export const eliminarSubcategoria = async(req, res, next) => {
    
    const id = req.params.idSubcategoria

    try {
        const subcategoria = await Subcategoria.destroy({where : {id}})
        res.json({mensaje: 'Subcategoria eliminada correctamente'})
    } catch (error) {
        console.log(error)
        next();
    }
}
