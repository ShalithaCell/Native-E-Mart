const combineRouters = require('koa-combine-routers');
// auth routes
const authRouter = require('./auth/authRouter');
const categoryRouter = require('./category/categoryRouter');

const router = combineRouters(
    authRouter,
    categoryRouter,
);

module.exports = router;
