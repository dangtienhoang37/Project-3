// import mysql, { createPool } from 'mysql2'
import { Sequelize } from 'sequelize';
import { logger } from '../common/helper/logger';
// const pool = createPool({
//     host: "localhost",
//     user: "root",
//     password: "1111",
//     database: "parkingsys",
//     connectionLimit: 10
// })




// export default pool;

export const sequelize = new Sequelize('parkingsys', 'hoanghoi', 'Hoanghoine01@', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})
export const connectDB = sequelize.authenticate().then(() => {
    logger.sucess("connected to DB", '');


}).catch((err) => {
    console.log('unable to connect ', err);

})
