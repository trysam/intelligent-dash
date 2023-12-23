const logger = require('./logger');

const requestLogger = (req, res, next) => {
  logger.info('Request Method:', req.method);
  logger.info('Request URL:', req.url);
  logger.info('Request Body:', req.body);
  next();
};  

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).send({ error:'malformatted id' });
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).send({ error: 'invalid token' });
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).send({ error: 'token expired' });
  }
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).send({ error: 'token missing or invalid' });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  
  res.status(500).send({ error: err.message });

  next(err);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  }
  next();
};

module.exports = { requestLogger, unknownEndpoint, errorHandler, tokenExtractor };
