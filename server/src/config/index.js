const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    connectionString : process.env.MONGO_CONNECTION,
};
