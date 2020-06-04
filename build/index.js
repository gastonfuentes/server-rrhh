"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
//llamamos a las rutas del index
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
class Server {
    constructor() {
        //inicializamos express en la variable app
        this.app = express_1.default();
        //inicializamos las funciones config y routes
        this.config();
        this.routes();
    }
    config() {
        //aqui le decimos que el puerto va a tomar una predefinido por el servidor que contratemos o en caso contrario que tome el puerto 3000
        this.app.set("port", process.env.PORT || 3000);
        //morgan devuelve por consola las peticiones que esta haciendo el cliente
        this.app.use(morgan_1.default('dev'));
        //cors sirve para que angular haga las peticiones al servidor
        this.app.use(cors_1.default());
        //express.jason sirve para trabajar con formatos json
        this.app.use(express_1.default.json());
        //urlencoded sirve para trabajar con los formularios
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/usuario', usuarioRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log('Servidor on port', this.app.get('port'));
        });
    }
}
//inicializamos la clase
const server = new Server();
// iniciamos la funcion start
server.start();
