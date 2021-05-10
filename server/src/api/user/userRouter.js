const Router = require('koa-router');
const StatusCodes = require('http-status-codes');
const validator = require("email-validator");
const owasp = require('owasp-password-strength-test');
const jwt = require('../../middlewares/token/jwt');
const { NewUser, Response } = require("../../types");
const { userService, emailNotificationService, TokenService, dataManagerService } = require('../../services');

// Prefix all routes with: /auth
const router = new Router({
    prefix : '/user',
});

// Routes will go here

// user sign in method
router.post('/', jwt, async (ctx, next) =>
{
    // check data validation
    const request = Object.setPrototypeOf(ctx.request.body, NewUser.prototype);

    const response = new Response();

    // check data validation
    if (!request.isValid())
    {
        ctx.response.status = StatusCodes.BAD_REQUEST;

        response.success = false;
        response.message = "required field(s) missing";
        response.data = {
            message : "required field(s) missing",
        };

        ctx.body = response;
        next().then();

        return;
    }

    // checkEmail
    if (!validator.validate(request.email))
    {
        ctx.response.status = StatusCodes.BAD_REQUEST;

        response.success = false;
        response.message = "Please use a valid email address.";
        response.data = {
            message : "Please use a valid email address.",
        };

        ctx.body = response;
        next().then();

        return;
    }

    // check password
    const passwordValidationResult = owasp.test(request.password);

    if (!passwordValidationResult.strong)
    {
        ctx.response.status = StatusCodes.BAD_REQUEST;

        response.success = false;
        response.message = "Your Password is week.";
        response.data = {
            message : passwordValidationResult.errors,
        };

        ctx.body = response;
        next().then();

        return;
    }

    const hashPassword = await dataManagerService.encryptPassword(request.password);

    request.password = hashPassword;

    const result = await userService.create(request);

    if (!result)
    {
        ctx.response.status = StatusCodes.FORBIDDEN;

        response.success = false;
        response.message = "Cannot create account";
        response.data = {
            message : result,
        };

        ctx.body = response;
        next().then();

        return;
    }

    // get token
    const tokenData = await TokenService.generateNewToken(request.email);

    // send email for new user account confirmation
    emailNotificationService
        .sendUserConfirmationEmail(request.name, request.email, tokenData).then();

    response.success = true;
    response.message = `You are now registered.A verification email has been sent to ${request.email}.`;
    response.data = {
        user : result,
    };
    ctx.response.status = StatusCodes.OK;
    ctx.body = response;

    next().then();
});

module.exports = router;
