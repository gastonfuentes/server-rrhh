import { Request, Response } from "express";
//traemos la conexion a la base
import pool from "../database";


class IndexController {
    constructor() {
        
    }

    public index (req: Request, res: Response){
        pool.query('DESCRIBE usuarios');
        res.status(200).json({
            message: 'Bienvenidos',
        })
    }
}

export const indexController = new IndexController();