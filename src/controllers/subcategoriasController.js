const Subcategoria = require ('../models/subcategorias.js')

const mostrarSubcategorias = async(req, res, next) => {
    try {
        const subcategoria = await Subcategoria.findAll({})
        res.status(200).json(subcategoria);
    } catch (error) {
        console.log(error)
        next();
    }
}

const mostrarSubcategoria = async(req, res, next) => {
    const id = req.params.idSubcategoria
    try {
        const subcategoria = await Subcategoria.findAll({where: {id}})
        res.status(200).json(subcategoria);
    } catch (error) {
        console.log(error)
        next();
    }
}

const mostrarSubcategoriaDCat = async(req, res, next) => {
    const id_categoria = req.params.idCategoria
    try {
        const subcategoria = await Subcategoria.findAll({where: {id_categoria}})
        res.status(200).json(subcategoria);
    } catch (error) {
        console.log(error)
        next();
    }
}

const agregarSubcategoria = async(req, res, next) => {
    
    const {nombre, id_categoria} = (req.body);

    try {
        const subcategoria = await Subcategoria.create({nombre, id_categoria})
        res.status(200).json({mensaje: 'Subcategoria creada correctamente'})
    } catch (error) {
        console.log(error)
        next();
    }
}

const actualizarSubcategoria = async(req, res, next) => {
    
    const {nombre, id_categoria} = (req.body);
    const id = req.params.idSubcategoria

    try {
        const subcategoria = await Subcategoria.update({nombre, id_categoria},{where : {id}})
        res.status(200).json({mensaje: 'Subcategoria editado correctamente'})
    } catch (error) {
        console.log(error)
        next();
    }
}

const eliminarSubcategoria = async(req, res, next) => {
    
    const id = req.params.idSubcategoria

    try {
        const subcategoria = await Subcategoria.destroy({where : {id}})
        res.json({mensaje: 'Subcategoria eliminada correctamente'})
    } catch (error) {
        console.log(error)
        next();
    }
}

module.exports = {
    mostrarSubcategorias,
    mostrarSubcategoria,
    mostrarSubcategoriaDCat,
    agregarSubcategoria,
    actualizarSubcategoria,
    eliminarSubcategoria,
}