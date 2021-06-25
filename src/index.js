import  express  from "express";
import  router from "./routes/router.js"
import db from "./config/db.js"
import cors from "cors"
//Crea servidor
const app = express();
//Habilitando Cors
app.use(cors());


//Confirmando conexion con la base de datos
db.authenticate()
    .then(()=> console.log('Base de datos conectada'))
    .catch(error => console.log(error))
    
//Definiendo puerto
const port = process.env.PORT||4000;

//Habilitando el body parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//agregar router
app.use('/', router)


//puerto
app.listen(port,()=>{
    console.log(`El puerto esta funcionando en el puerto ${port}`)
});