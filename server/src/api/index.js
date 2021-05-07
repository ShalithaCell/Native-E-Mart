const combineRouters = require('koa-combine-routers');
// auth routes
const authRouter = require('./auth/authRouter');
const categoryRouter = require('./category/categoryRouter');
const userRouter = require('./user/userRouter');

const router = combineRouters(
    authRouter,
    categoryRouter,
  userRouter,
);

module.exports = router;
