const Koa = require('koa');
const koaBody = require('koa-body');
const router = require('./api');
const { dbContext, exceptionService } = require('./services');

// init the database connection.
dbContext();

const app = new Koa();

app
    .use(koaBody())
    .use(exceptionService.errorHandler) // register generic error handler middleware
    .use(exceptionService.jsonErrorHandler) // register json error handler middleware
    .use(router()) // Use the Router on the sub routes
    // Bootstrap the server
    .listen(process.env.PORT || 5000, () =>
    {
        console.log('server stared with port 5000');
    });
