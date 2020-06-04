"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//importamos el modulo ROuter de express para en rutamiento
const express_1 = require("express");
//importamos el controlador creado en indexController
const usuarioControllers_1 = require("../controllers/usuarioControllers");
class UsuarioRouter {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    //el metodo config usa la propiedad router y a partir de ella poder definir las rutas
    config() {
        //aqui definimos la ruta inicial de la aplicacion
        this.router.get('/', usuarioControllers_1.usuarioController.list);
        this.router.get('/:id', usuarioControllers_1.usuarioController.getOne);
        this.router.post('/', usuarioControllers_1.usuarioController.create);
        this.router.put('/:id', usuarioControllers_1.usuarioController.update);
        this.router.delete('/:id', usuarioControllers_1.usuarioController.delete);
    }
}
//inicializamos la clase y la guardamos en una constante
const usuarioRoutes = new UsuarioRouter();
//exportamos la constante pero solo con la propiedad router
exports.default = usuarioRoutes.router;
