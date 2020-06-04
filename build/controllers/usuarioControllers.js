"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioController = void 0;
//traemos la conexion a la base
const database_1 = __importDefault(require("../database"));
class UsuarioController {
    constructor() {
    }
    // ==================================================
    // INICIO DE METODO PARA LISTAR TODOS LOS USUARIOS
    // ==================================================
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT usuarios_nombre, usuarios_email, idusuarios FROM usuarios', (err, respuesta) => {
                //comprobamos si no viene ningun err en la consulta
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: "error cargando usuarios",
                        error: err,
                    });
                }
                //si esta bien la consulta pero viene vacio devolvemos
                if (respuesta.length === 0) {
                    return res.status(400).json({
                        ok: false,
                        message: 'no se encuentran usuarios en la db',
                    });
                }
                // si esta todo ok mostramos lo encontrado            
                res.status(200).json({
                    ok: true,
                    usuarios: respuesta,
                });
            });
        });
    }
    // ==================================================
    // FIN DE METODO PARA LISTAR TODOS LOS USUARIOS
    // ==================================================
    // ==================================================
    // INICIO DE METODO PARA LISTAR SOLO UN USUARIO
    // ==================================================
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //obtenemos el id
            const id = req.params.id;
            //hacemos la consulta con el id obtenido
            yield database_1.default.query('SELECT * FROM usuarios WHERE idusuarios = ?', [id], (err, usuario) => {
                //comprobamos si no viene ningun err en la consulta            
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: "error al buscar un usuario",
                        error: err,
                    });
                }
                //si esta bien la consulta pero viene vacio devolvemos
                if (usuario.length === 0) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: "el usuario con el id " + id + " no existe",
                    });
                }
                //si esta todo ok mostramos el usuario consultado
                res.status(200).json({
                    ok: true,
                    message: 'usuario mostrado correctamente',
                    body: usuario,
                });
            });
        });
    }
    // ==================================================
    // FIN DE METODO PARA LISTAR SOLO UN USUARIO
    // ==================================================
    // ==================================================
    // INICIO DE METODO PARA CREAR UN USUARIO
    // ==================================================
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var body = req.body;
            //realizamos el query y mandamos a la base lo que obtenemos en el body. si da error la consulta entonces devolvemos un msj con el error, en caso contrario mostramos el usuario guardado
            yield database_1.default.query('INSERT INTO usuarios set ?', [body], (err, usuarioGuardado) => {
                //comprobamos si no viene ningun err en la consulta      
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: "error al crear un usuario",
                        error: err,
                    });
                }
                //en caso que pase la consulta guardamos lo que tenemos en el body en una variable y a continuacion modificamos la contrasena para no mostrar la verdadera 
                let usuarioNuevo = body;
                usuarioNuevo.usuarios_password = ':)';
                //mostramos el usuario que se guardo
                res.status(200).json({
                    ok: true,
                    message: 'usuario creado correctamente',
                    body: usuarioNuevo,
                });
            });
        });
    }
    // ==================================================
    // FIN DE METODO PARA CREAR UN USUARIO
    // ==================================================
    // ==================================================
    // INICIO DEL METODO PARA ACTUALIZAR UN USUARIO
    // ==================================================
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //obtenemos el id
            const id = req.params.id;
            //obtenemos lo que viene en el body
            const body = req.body;
            yield database_1.default.query('SELECT * FROM usuarios WHERE idusuarios = ?', [id], (err, resul) => {
                //comprobamos si no viene ningun err en la consulta             
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: "error acrualizando usuarios",
                        error: err,
                    });
                }
                //si esta bien la consulta pero viene vacio devolvemos
                if (resul.length === 0) {
                    return res.status(400).json({
                        message: 'usuario no encontrado'
                    });
                }
                // si encontramos el usuario a modificar hacemos la consulta
                database_1.default.query('UPDATE usuarios set ? WHERE idusuarios = ?', [body, id], (err, resul) => {
                    //preguntamos si la cosulta esta bien o no
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            mensaje: "error borrando usuarios",
                            error: err,
                        });
                    }
                    // si la consulta esta ok mostramos el usuario actualizado
                    res.status(200).json({
                        ok: true,
                        message: 'actualizando el usuario ' + req.params.id,
                        body: resul,
                    });
                });
            });
        });
    }
    // ==================================================
    // FIN DEL METODO PARA ACTUALIZAR UN USUARIO
    // ==================================================
    // ==================================================
    // INICIO DEL METODO PARA ELIMINAR UN USUARIO
    // ==================================================
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var num = req.params.id;
            yield database_1.default.query('DELETE FROM usuarios WHERE idusuarios = ?', [num], (err, resul) => {
                //preguntamos si la consulta esta bien
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: "error borrando usuarios",
                        error: err,
                    });
                }
                // si viene vacio devolvemos un error
                if (resul.affectedRows === 0) {
                    return res.status(400).json({
                        message: 'el usuario con el id: ' + num + 'no existe'
                    });
                }
                //si esta todo ok
                res.status(200).json({
                    ok: true,
                    usuarios: resul,
                });
            });
        });
    }
}
// ==================================================
// FIN DE LA CLASE
// ==================================================
exports.usuarioController = new UsuarioController();
