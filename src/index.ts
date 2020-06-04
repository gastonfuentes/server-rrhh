
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

//llamamos a las rutas del index
import indexRoutes from "./routes/indexRoutes";
import usuarioRoutes from "./routes/usuarioRoutes";


class Server {
    //creamos una propiedad app de tipo Application (express)
    public app: Application;

    constructor() {
        //inicializamos express en la variable app
        this.app = express();
        //inicializamos las funciones config y routes
        this.config();
        this.routes();
    }

    config(): void{
        //aqui le decimos que el puerto va a tomar una predefinido por el servidor que contratemos o en caso contrario que tome el puerto 3000
        this.app.set("port", process.env.PORT || 3000);
        //morgan devuelve por consola las peticiones que esta haciendo el cliente
        this.app.use(morgan('dev'));
        //cors sirve para que angular haga las peticiones al servidor
        this.app.use(cors());
        //express.jason sirve para trabajar con formatos json
        this.app.use(express.json());
        //urlencoded sirve para trabajar con los formularios
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void{
        this.app.use('/',indexRoutes);
        this.app.use('/api/usuario',usuarioRoutes);
    }

    start(): void{
        this.app.listen(this.app.get("port"), ()=>{
            console.log('Servidor on port', this.app.get('port'));
        })
    }
}

//inicializamos la clase
const server = new Server();
// iniciamos la funcion start
server.start();