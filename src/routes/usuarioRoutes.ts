//importamos el modulo ROuter de express para en rutamiento
import { Router } from "express";
//importamos el controlador creado en indexController
import { usuarioController } from "../controllers/usuarioControllers";

class UsuarioRouter{
    
    public router: Router = Router();

    constructor() {
        this.config();
    }

    //el metodo config usa la propiedad router y a partir de ella poder definir las rutas
    config(): void{
        //aqui definimos la ruta inicial de la aplicacion
        this.router.get('/', usuarioController.list);
        this.router.get('/:id', usuarioController.getOne);
        this.router.post('/', usuarioController.create);
        this.router.put('/:id', usuarioController.update);
        this.router.delete('/:id', usuarioController.delete);
    }
}

//inicializamos la clase y la guardamos en una constante
const usuarioRoutes = new UsuarioRouter();
//exportamos la constante pero solo con la propiedad router
export default usuarioRoutes.router;