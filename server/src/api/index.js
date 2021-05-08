const combineRouters = require('koa-combine-routers');
// auth routes
const authRouter = require('./auth/authRouter');
const categoryRouter = require('./category/categoryRouter');
const userRouter = require('./user/userRouter');
const itemRouter = require('./items/itemRouter');

const router = combineRouters(
    authRouter,
    categoryRouter,
    userRouter,
    itemRouter,
);

module.exports = router;
