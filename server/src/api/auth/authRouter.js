const Router = require('koa-router');
const StatusCodes = require('http-status-codes');
const { CredentialType } = require('../../types');
const { userService } = require('../../services');
const { authenticate } = require('../../middlewares');

// Prefix all routes with: /auth
const router = new Router({
    prefix : '/auth',
});

// Routes will go here

// user sign in method
router.post('/', async (ctx, next) =>
{
    const request = Object.setPrototypeOf(ctx.request.body, CredentialType.prototype);
    // Check if any of the data field not empty

    if (!request.isValid())
    {
        ctx.response.status = StatusCodes.BAD_REQUEST;
        ctx.body = 'Please enter username and password';
    }
    else
    {
        const user = await userService.getUserFromDb();

        ctx.response.status = StatusCodes.OK;
        ctx.body = user;

        authenticate(this, user);
    }

    next().then();
});

module.exports = router;
