const express = require("express");
const router = require("./routes/router.js");
const db = require("./config/db.js");
const cors = require("cors");
//Crea servidor
const app = express();
//Habilitando Cors
app.use(cors());


//Confirmando conexion con la base de datos
db.authenticate()
    .then(()=> console.log('Base de datos conectada'))
    .catch(error => console.log(error))
    
//Definiendo puerto
const port = process.env.PORT||5000;

//Habilitando el body parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Carpeta publica
app.use(express.static('uploads'))

//agregar router
app.use('/', router)


//puerto
app.listen(port,'127.0.0.1',()=>{
    console.log(`El puerto esta funcionando en el puerto ${port}`)
});