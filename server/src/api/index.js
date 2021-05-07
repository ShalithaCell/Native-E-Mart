const combineRouters = require('koa-combine-routers');
// auth routes
const authRouter = require('./auth/authRouter');
const userRouter = require('./user/userRouter');

const router = combineRouters(
    authRouter,
    userRouter,
);

module.exports = router;
