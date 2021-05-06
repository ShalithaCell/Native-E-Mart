const jwt = require('jsonwebtoken');
const StatusCodes = require('http-status-codes');
const { jwtSecret, tokenExpireTime } = require('../../config');
const { userService } = require('../../services');
const { Response } = require('../../types');

const authenticate = async (ctx, data) =>
{
    const response = new Response();

    try
    {
        const user = await userService.find(data.email, data.password);

        if (user)
        {
            ctx.status = StatusCodes.OK;

            const token = await jwt.sign(user.toJSON(), jwtSecret, {
                expiresIn : tokenExpireTime,
            });

            // remove password field
            user.password = undefined;

            // set response
            response.success = true;
            response.message = `Successfully singed in as ${user.name}.`;
            response.data = {
                token,
                user,
            };
        }
        else
        {
            ctx.status = StatusCodes.UNAUTHORIZED;

            // set response
            response.success = false;
            response.message = `There was an error with your e-mail/password combination. Please try again.`;
            response.data = {
                token : null,
                user  : null,
            };
        }
    }
    catch (error)
    {
        console.log(error);

        ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;

        // set response
        response.success = false;
        response.message = `Sorry, there were some technical issues while processing your request.`;
        response.data = {
            message : error.message,
            error,
        };
    }

    ctx.body = response;
};

module.exports = authenticate;
