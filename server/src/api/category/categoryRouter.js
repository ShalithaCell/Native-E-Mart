const Router = require('koa-router');
const StatusCodes = require('http-status-codes');
const { CategoryType } = require('../../types');
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

    if (!request.isValid())
    {
        ctx.response.status = StatusCodes.BAD_REQUEST;
        ctx.body = 'Please enter a category name';
        next().then();

        return;
    }

    const result = await CategoryService.create(request);

    next(
        ctx.response.status = StatusCodes.OK,
        ctx.body = result,
    ).then();
});

module.exports = router;
