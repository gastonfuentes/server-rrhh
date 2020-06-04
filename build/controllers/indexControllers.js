"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
//traemos la conexion a la base
const database_1 = __importDefault(require("../database"));
class IndexController {
    constructor() {
    }
    index(req, res) {
        database_1.default.query('DESCRIBE usuarios');
        res.status(200).json({
            message: 'Bienvenidos',
        });
    }
}
exports.indexController = new IndexController();
