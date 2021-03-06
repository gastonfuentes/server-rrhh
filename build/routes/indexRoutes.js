"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//importamos el modulo ROuter de express para en rutamiento
const express_1 = require("express");
//importamos el controlador creado en indexController
const indexControllers_1 = require("../controllers/indexControllers");
class IndexRouter {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    //el metodo config usa la propiedad router y a partir de ella poder definir las rutas
    config() {
        //aqui definimos la ruta inicial de la aplicacion
        this.router.get('/', indexControllers_1.indexController.index);
    }
}
//inicializamos la clase y la guardamos en una constante
const indexRoutes = new IndexRouter();
//exportamos la constante pero solo con la propiedad router
exports.default = indexRoutes.router;
