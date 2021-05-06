const jwt = require('jsonwebtoken');
const StatusCodes = require('http-status-codes');
const { jwtSecret } = require('../../config');
const { userService } = require('../../services');

const authenticate = async (ctx, data) =>
{
    try
    {
        const user = await userService.find(data.email, data.password);

        if (user)
        {
            ctx.status = StatusCodes.OK;

            const token = await jwt.sign(user.toJSON(), jwtSecret, {
                expiresIn : 604800, // 1 week
            });

            ctx.body = {
                token, // Should be the same secret key as the one used is ./jwt.js
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
    }
    catch (error)
    {
        console.log(error);
        ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;
        ctx.body = {
            message : error.message,
        };
    }
};

module.exports = authenticate;
