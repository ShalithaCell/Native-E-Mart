const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    connectionString : process.env.MONGO_CONNECTION,
    jwtSecret        : process.env.JWT_SECRET,
    tokenExpireTime  : process.env.JWT_TOKEN_EXPIRE || 86400,
};
