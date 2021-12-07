const Banco = require("../models/banco")


const Bancos = {
    mostrarBancoPorEmpleado: async function(req,res){
       
            let id_empleado = req.params.idEmpleado

            try {
            const bEmpleado = await Banco.findOne({where:{id_empleado}})
            res.status(200).json(bEmpleado)
            } catch (error) {
                console.log(error)
                next();
            }
            
        
    }
}

module.exports = Bancos;