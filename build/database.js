"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//importamos el modulo mysql para trabajar con la base de datos
const mysql_1 = __importDefault(require("mysql"));
//importamos los datos de conexion
const keys_1 = __importDefault(require("./keys"));
const pool = mysql_1.default.createPool(keys_1.default.database);
pool.getConnection((err, conexion) => {
    if (err) {
        console.error(err);
        console.log('no anda no mierda');
    }
    ;
    pool.releaseConnection(conexion);
    console.log('db is conected');
});
exports.default = pool;
