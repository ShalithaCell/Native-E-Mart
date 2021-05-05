const koaJwt = require('koa-jwt');
const { jwtSecret } = require('../../config');

module.exports = koaJwt({
    secret : jwtSecret, // Should not be hardcoded
});
