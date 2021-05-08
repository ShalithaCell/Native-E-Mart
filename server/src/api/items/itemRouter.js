const Router = require('koa-router');
const StatusCodes = require('http-status-codes');
const { ItemType, Response } = require('../../types');
const { ItemService } = require('../../services');

// Prefix all routes with: /item
const router = new Router({
    prefix : '/item',
});

// Routes will go here

// item create method
router.post('/create', async (ctx, next) =>
{
    const request = Object.setPrototypeOf(ctx.request.body, ItemType.prototype);
    // Check if any of the data field not empty

    console.log(request.isValid());

    const response = new Response();

    if (!request.isValid())
    {
        ctx.response.status = StatusCodes.BAD_REQUEST;
        response.success = false;
        response.message = "required field(s) missing";
        response.data = {
            message : "required field(s) missing",
        };
        next().then();

        return;
    }

    const result = await ItemService.create(request);

    if (!result)
    {
        ctx.response.status = StatusCodes.FORBIDDEN;

        response.success = false;
        response.message = "Cannot create item";
        response.data = {
            message : '',
        };

        ctx.body = response;
        next().then();

        return;
    }

    response.success = true;
    response.message = `Item created successfully.`;
    response.data = {
        item : result,
    };
    ctx.response.status = StatusCodes.OK;
    ctx.body = response;
    next().then();
});

module.exports = router;
