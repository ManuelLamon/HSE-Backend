const Categoria = require ("../models/categorias.js");
const multer = require ('multer');
const shortid = require ('shortid');

let fileStorage;

const confinguracionMulter = {
    storage: fileStorage =  multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads/categorias/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb){
         if( file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
             cb(null,true);
         }else{
             cb(new Error('Formato No válido'))
         }
    },
}

//pasar la configuración y el campo
  const upload = multer(confinguracionMulter).single('imagen');

//Sube un archivo
const subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            res.status(404).json({mensaje: error})
        }
        return next();
    })
}



const agregarCategoria = async (req, res, next) =>{
    
    const {nombre,color} = (req.body);
    let imagen = '';
    try {
        if(req.file.filename){
            imagen = req.file.filename;
        }
        await Categoria.create({
            nombre,
            color,
            imagen
        });

        res.status(200).json({mensaje: 'Categoria creada correctamente'})
    } catch (error) {
        res.status(404).json({mensaje: 'Hubo un error, intente de nuevo'})
        console.log(error);
        next();
    }
}

const mostrarCategorias = async (req, res, next) => {
    try {
        //obtener todos los productos
        const categorias = await Categoria.findAll({});
        res.status(200).json(categorias)
        
    } catch (error) {
        res.status(404).json({mensaje: 'Hubo un error, intente de nuevo'})
        console.log(error);
        next();
    }
}
const mostrarCategoria = async (req, res, next) => {

    const id = req.params.idCategoria
    
    if(!id){
        res.status(404).json({mensaje : 'Ese Producto no existe'})
    }else{
        try {
            //obtener todos los categoria
            const categoria = await Categoria.findOne({where : {id}});
            res.status(200).json(categoria)
            
        } catch (error) {
            res.status(404).json({mensaje: 'Hubo un error, intente de nuevo'})
            console.log(error);
            next();
        }
    }

   
}

const actualizarCategoria = async (req, res, next) =>{

    const id = req.params.idCategoria
    const {nombre,color} = (req.body);
    let imagen = '';

    try {

        let dbImagen = await  Categoria.findOne({where : {id}});

        if(req.file){

            imagen = req.file.filename;
        } else {

            imagen = dbImagen.imagen;
        }

         //actualizar categoria
         let categoria = await Categoria.update({nombre, imagen, color},{where : {id}});
         if(categoria == 1){
            res.status(200).json({mensaje: 'Se ha actualizado con Éxito'})
         }else{
            res.status(404).json({mensaje: 'Hubo un error'})
         }
        
    } catch (error) {
        console.log(error)
        next();
    }
}

module.exports = {
    subirArchivo,
    agregarCategoria,
    mostrarCategorias,
    mostrarCategoria,
    actualizarCategoria,
}