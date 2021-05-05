const jwt = require('koa-jwt');
const StatusCodes = require('http-status-codes');
const { jwtSecret } = require('../../config');
const { userService } = require('../../services');

const authenticate = async (ctx, data) =>
{
    const user = await userService.find(data.email, data.password);

    if (user.length !== 0)
    {
        ctx.status = StatusCodes.OK;
        ctx.body = {
            token   : jwt.sign({ role: 'admin' }, jwtSecret), // Should be the same secret key as the one used is ./jwt.js
            message : "Successfully logged in!",
        };
    }
    else
    {
        ctx.status = StatusCodes.UNAUTHORIZED;
        ctx.body = {
            message : "Authentication failed",
        };
    }

    return ctx;
};

module.exports = authenticate;
