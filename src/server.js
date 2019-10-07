import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');

const config = {
    name: 'youth-award-api',
    port: 5000,
    host: '127.0.0.1',
};

const app = express();
const logger = log({ console: true, file: false, label: config.name });

app.use(cors());

// Normal express config defaults
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(ExpressAPILogMiddleware(logger, { request: true }));

app.get('/', (req, res) => {
    res.status(200).send('welcome to our api');
});

app.listen(config.port, config.host, (e)=> {
    if(e) {
        throw new Error('Internal Server Error');
    }
    logger.info(`${config.name} running on ${config.host}:${config.port}`);
});