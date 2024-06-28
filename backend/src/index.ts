
import express, { Express, Request, Response, Application } from 'express';
import cors from 'cors';
import router from './routers';
import ErrorObject from './common/Error/error';
import { ApiStatusCode } from './common/enum/apiStatusCode';
import middlewares from './middleware';
import bodyParser from 'body-parser';
import { connectDB } from './config/db';
import { initDatabase } from './config/init.db';
import multer from 'multer'
// import router from './routers';

// connect db
// them err handler
//For env File 
// dotenv.config();
export const app: Express = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

connectDB;
initDatabase();

// console.log(new Account());







app.get('/', (req, res) => {

    res.send('GET request to the homepage')
})

app.use('/v1/api', router);
app.all('*', (req, res, next) => {
    const err = new ErrorObject('The router can not be found', ApiStatusCode.BAD_REQUEST, "router issue");
    return next(err); // nem err sang route tiep theo
})

app.use(middlewares.errorHandler);

