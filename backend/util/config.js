require('dotenv').config();

const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.NODE_ENV === 'test' 
    ? process.env.MONGODB_URI_TEST.toString()
    : process.env.MONGODB_URI.toString() 

module.exports = { PORT, MONGODB_URI };