import Categoria from "../models/categorias.js";
import multer from 'multer';
import shortid from 'shortid'

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
export const subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            res.json({mensaje: error})
        }
        return next();
    })
}

export const agregarCategoria = async (req, res, next) =>{
    
    const {nombre} = (req.body);
    let imagen = '';
    try {
        if(req.file.filename){
            imagen = req.file.filename;
        }
        await Categoria.create({
            nombre,
            imagen
        });

        res.json({mensaje: 'Categoria creada correctamente'})
    } catch (error) {
        console.log(error);
        next();
    }
}

export const mostrarCategorias = async (req, res, next) => {
    try {
        //obtener todos los productos
        const categorias = await Categoria.findAll({});
        res.json(categorias)
        
    } catch (error) {
        console.log(error);
        next();
    }
}
export const mostrarCategoria = async (req, res, next) => {

    const id = req.params.idCategoria
    
    if(!id){
        res.json({mensaje : 'Ese Producto no existe'})
    }else{
        try {
            //obtener todos los categoria
            const categoria = await Categoria.findOne({where : {id}});
            res.json(categoria)
            
        } catch (error) {
            console.log(error);
            next();
        }
    }

   
}

export const actualizarCategoria = async (req, res, next) =>{

    const id = req.params.idCategoria
    const {nombre} = (req.body);
    let imagen = '';

    try {

        let dbImagen = await  Categoria.findOne({where : {id}});

        if(req.file){

            imagen = req.file.filename;
        } else {

            imagen = dbImagen.imagen;
        }

         //actualizar categoria
         let categoria = await Categoria.update({nombre, imagen},{where : {id}});
         if(categoria == 1){
            res.json({mensaje: 'Se ha actualizado con Éxito'})
         }else{
            res.json({mensaje: 'Hubo un error'})
         }
        
    } catch (error) {
        console.log(error)
        next();
    }
}