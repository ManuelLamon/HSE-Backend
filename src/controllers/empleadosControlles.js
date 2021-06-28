const EmpleadosShow = require('../models/empleadosShow');

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

module.exports = {
    mostrarEmpleadosPCategoria,
    mostrarEmpleadosPSubcategoria,
    mostrarEmpleado
}