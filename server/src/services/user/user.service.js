const { User } = require("../../models");
const { NewUser } = require('../../types');
const RoleService = require('../userRole/userRole.service');

const UserService = {
    find : async (email, password) =>
    {
        const data = await User.find({ email, password }).populate('role');

        return data;
    },
    findByEmail : async (email) =>
    {
        const data = await User.find({ email }).populate('role').catch((err) =>
        {
            // TODO: log error
            console.log(err);

            return null;
        });

        return data;
    },
    create : async (userData) =>
    {
        try
        {
            // check data validation
            const request = Object.setPrototypeOf(userData, NewUser.prototype);

            if (!request.isValid())
            {
                return null;
            }
            // check already exists
            const users = await UserService.findByEmail(request.email);

            // check role
            const role = await RoleService.find(request.role);

            if (!role)
            {
                return null;
            }

            if (users.length > 0) return null;

            const user = new User({
                name     : request.name,
                email    : request.email,
                password : request.password,
                phone    : request.phone,
                role     : role._id,
            });

            // create user
            const data = await user.save();

            return data;
        }
        catch (e)
        {
            console.log(e);
            throw e;
        }
    },
};

module.exports = UserService;
