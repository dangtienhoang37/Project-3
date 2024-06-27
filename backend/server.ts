
import dotenv from 'dotenv'
import { app } from './src';
dotenv.config();


const port = process.env.PORT || 8000;

// chi khoi tao nodejs
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
// phan nay de khi exit se co thong bao
process.on('SIGINT', () => {
    server.close(() => console.log(`exit express`));
})