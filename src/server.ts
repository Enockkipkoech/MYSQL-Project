import http from 'http';
import express from 'express';
import config from './config/config';
import bookRoutes from './routes/bookRoutes'

const NAMESPACE = 'Server';
const router = express();


// Log the Request
router.use((req, res, next) => {
    console.log(NAMESPACE, `METHOD: [${req.method} -URL: [${req.url}] - IP: [${req.socket.remoteAddress}]]`);

    res.on('finish', () => {
        //log the res
        console.log(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`)
    });
    next();
});

//Routes go here
router.use('/books', bookRoutes);

//Error Handling 
router.use((req,res,next) =>{
    const error = new Error('URL Not found');

    res.status(404).json({
        status: 'Fail.Try again Dev_Enoc!',
        message:error.message
    });
});

const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => {
    console.log(
        NAMESPACE,
        `Server is running as ${config.server.hostname} on port: ${config.server.port}`
    )
});