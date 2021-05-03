const jwt = require('koa-jwt');
const StatusCodes = require('http-status-codes');
const { AuthenticateUser } = require('../../types');

const authenticate = (ctx, data) =>
{
    const user = Object.setPrototypeOf(data, AuthenticateUser.prototype);

    if (user.isAuthenticated)
    {
        ctx.status = StatusCodes.OK;
        ctx.body = {
            token   : jwt.sign({ role: 'admin' }, 'A very secret key'), // Should be the same secret key as the one used is ./jwt.js
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
