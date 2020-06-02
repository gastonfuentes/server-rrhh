//importamos el modulo ROuter de express para en rutamiento
import { Router } from "express";

class IndexRouter{

    public router: Router = Router();

    constructor() {
        this.config();
    }

    //el metodo config usa la propiedad router y a partir de ella poder definir las rutas
    config(): void{
        //aqui definimos la ruta inicial de la aplicacion
        this.router.get('/', (req, res)=>{
            res.send('hello');
        })
    }
}

//inicializamos la clase y la guardamos en una constante
const indexRoutes = new IndexRouter();
//exportamos la constante pero solo con la propiedad router
export default indexRoutes.router;