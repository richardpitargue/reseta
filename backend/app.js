import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import winston from 'winston';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import config from './config/config';

let app = express();
const CORS = {
    allowed_headers: 'Access-Token, X-Requested-With, Content-Type, Accept, Authorization',
    allowed_origins: '*',
    allowed_methods: 'GET, POST, PUT, OPTIONS, DELETE',
    allow_credentials: 'true'
}

winston.cli();
winston.level = config.LOG_LEVEL || 'silly';
winston.log('info', 'Starting', config.APP_NAME, 'on', config.ENV, 'environment');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', CORS.allowed_origins);
    res.header('Access-Control-Allow-Headers', CORS.allowed_headers);
    res.header('Access-Control-Allow-Credentials', CORS.allow_credentials);
    res.header('Access-Control-Allow-Methods', CORS.allowed_methods);
    next();
}
);
app.use(express.static(path.join(__dirname, '/../app')));
app.use('/api', require(path.join(__dirname, '/config/router'))(express.Router()));

app.get('/api*', (req, res) => {
    res.status(403).send({
        'message': 'Nothing to see here.'
    });
})

export default app;
