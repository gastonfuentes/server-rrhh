//importamos el modulo mysql para trabajar con la base de datos
import mysql from "mysql";
//importamos los datos de conexion
import keys from "./keys";



const pool = mysql.createPool(keys.database);

pool.getConnection((err, conexion)=>{
    if(err){
        console.error(err);
        console.log('no anda no mierda');
    };
    pool.releaseConnection(conexion);
    console.log('db is conected');
});

export default pool;