const Router = require('koa-router');
const StatusCodes = require('http-status-codes');
const { CategoryType, Response } = require('../../types');
const { CategoryService } = require('../../services');

// Prefix all routes with: /category
const router = new Router({
    prefix : '/category',
});

// Routes will go here

// category create method
router.post('/create', async (ctx, next) =>

{
    const params = ctx.request.body;

    console.log(params);

    const request = Object.setPrototypeOf(ctx.request.body, CategoryType.prototype);
    // Check if any of the data field not empty

    console.log(request);

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

    const result = await CategoryService.create(request);

    if (!result)
    {
        ctx.response.status = StatusCodes.FORBIDDEN;

        response.success = false;
        response.message = "Cannot create category";
        response.data = {
            message : '',
        };

        ctx.body = response;
        next().then();

        return;
    }

    response.success = true;
    response.message = `Category created successfully.`;
    response.data = {
        category : result,
    };
    ctx.response.status = StatusCodes.OK;
    ctx.body = response;
    next().then();
});

module.exports = router;
