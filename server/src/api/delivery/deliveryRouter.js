const Router = require('koa-router');
const StatusCodes = require('http-status-codes');
const { CredentialType } = require('../../types');

// Prefix all routes with: /delivery
const deliveryRouter = new Router({
    prefix : '/delivery',
});

// Routes will go here

// user sign in method
deliveryRouter.post('/', async (ctx, next) =>
{
    const request = Object.setPrototypeOf(ctx.request.body, CredentialType.prototype);
    // Check if any of the data field not empty

    if (!request.isValid())
    {
        ctx.response.status = StatusCodes.BAD_REQUEST;
        ctx.body = 'Please enter details';
        next().then();

        return;
    }

    next().then();
});

module.exports = deliveryRouter;
