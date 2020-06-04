import { Request, Response, response } from "express";
//traemos la conexion a la base
import pool from "../database";


class UsuarioController {

    constructor() {
    }

// ==================================================
// INICIO DE METODO PARA LISTAR TODOS LOS USUARIOS
// ==================================================
    public async list (req: Request, res: Response){
        await pool.query('SELECT usuarios_nombre, usuarios_email, idusuarios FROM usuarios',(err, respuesta)=>{
            //comprobamos si no viene ningun err en la consulta
            if(err){
                return res.status(500).json({
                ok: false,
                message: "error cargando usuarios",
                error: err,
                });
            }
            //si esta bien la consulta pero viene vacio devolvemos
            if(respuesta.length === 0){
                return res.status(400).json({
                    ok: false,
                    message: 'no se encuentran usuarios en la db',
                })
            }
            // si esta todo ok mostramos lo encontrado            
            res.status(200).json({
                ok: true,
                usuarios: respuesta, //mostramos los usuarios que encontro la consulta
              });
        });
        
    }
// ==================================================
// FIN DE METODO PARA LISTAR TODOS LOS USUARIOS
// ==================================================

// ==================================================
// INICIO DE METODO PARA LISTAR SOLO UN USUARIO
// ==================================================

    public async getOne (req: Request, res: Response){
        //obtenemos el id
        const id = req.params.id;
        //hacemos la consulta con el id obtenido
        await pool.query('SELECT * FROM usuarios WHERE idusuarios = ?', [id],(err, usuario)=>{
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
        
    }

// ==================================================
// FIN DE METODO PARA LISTAR SOLO UN USUARIO
// ==================================================

// ==================================================
// INICIO DE METODO PARA CREAR UN USUARIO
// ==================================================

    public async create (req: Request, res: Response){
        var body = req.body;
        //realizamos el query y mandamos a la base lo que obtenemos en el body. si da error la consulta entonces devolvemos un msj con el error, en caso contrario mostramos el usuario guardado
        await pool.query('INSERT INTO usuarios set ?', [body], (err, usuarioGuardado)=>{
            //comprobamos si no viene ningun err en la consulta      
            if(err){
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
            })
        });
        
    }
// ==================================================
// FIN DE METODO PARA CREAR UN USUARIO
// ==================================================


// ==================================================
// INICIO DEL METODO PARA ACTUALIZAR UN USUARIO
// ==================================================
    public async update (req: Request, res: Response){
        //obtenemos el id
        const id = req.params.id;
        //obtenemos lo que viene en el body
        const body = req.body;

        await pool.query('SELECT * FROM usuarios WHERE idusuarios = ?', [id], (err, resul)=>{
            //comprobamos si no viene ningun err en la consulta             
            if(err){
                return res.status(500).json({
                ok: false,
                mensaje: "error acrualizando usuarios",
                error: err,
                });
            }
            //si esta bien la consulta pero viene vacio devolvemos
            if(resul.length === 0){
                return res.status(400).json({
                    message: 'usuario no encontrado'
                })
            }
            // si encontramos el usuario a modificar hacemos la consulta
            pool.query('UPDATE usuarios set ? WHERE idusuarios = ?',[body, id], (err, resul)=>{
                //preguntamos si la cosulta esta bien o no
                if(err){
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
            })
            
            })

        });

        
    }
// ==================================================
// FIN DEL METODO PARA ACTUALIZAR UN USUARIO
// ==================================================


// ==================================================
// INICIO DEL METODO PARA ELIMINAR UN USUARIO
// ==================================================
    public async delete (req: Request, res: Response){
        var num = req.params.id;        
        await pool.query('DELETE FROM usuarios WHERE idusuarios = ?', [num], (err, resul)=>{
            //preguntamos si la consulta esta bien
            if(err){
                return res.status(500).json({
                ok: false,
                mensaje: "error borrando usuarios",
                error: err,
                });
            }
            
            // si viene vacio devolvemos un error
            if(resul.affectedRows === 0){
                return res.status(400).json({
                    message: 'el usuario con el id: ' + num +'no existe'
                })
            }
            //si esta todo ok
            res.status(200).json({
                ok: true,
                usuarios: resul, //mostramos el usuario borrado
              });
        });
            

            
        
    }
// ==================================================
// FIN DEL METODO PARA ELIMINAR UN USUARIO
// ==================================================        
        


}
// ==================================================
// FIN DE LA CLASE
// ==================================================

export const usuarioController = new UsuarioController();