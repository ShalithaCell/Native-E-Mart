const combineRouters = require('koa-combine-routers');
// auth routes
const authRouter = require('./auth/authRouter');

const router = combineRouters(
    authRouter,
);

module.exports = router;

// delivery routes
const DeliveryRouter = require('./delivery/deliveryRouter');

const deliveryRouter = combineRouters(
    DeliveryRouter,
);

module.exports = deliveryRouter;
