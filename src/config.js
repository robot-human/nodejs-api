const { config } = require('dotenv');
config();

const MONGODB_URI = process.env.MONGODB_URI;
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = { MONGODB_URI, SECRET_KEY };