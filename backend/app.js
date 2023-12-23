const logger = require('./util/logger');
const config = require('./util/config');
const middleware = require('./util/middleware');
require('express-async-errors');

const cors = require('cors');
const morgan = require('morgan');
morgan.token('body', (req, res) => {
    if (req.data) {
        return JSON.stringify(req.data);
    } 
});

const rnaRouter = require('./routers/rnaRouter');
const excelRouter = require('./routers/excelToJson');


const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.set('strictQuery',false);

mongoose.connect(config.MONGODB_URI).then(
    () => {logger.info('Connected to MongoDB')},
).catch(
    err => {logger.error('Could not connect to MongoDB', err)}
);

app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', 'dev'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/rna', rnaRouter);
app.use('/api/excel', excelRouter);


app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;