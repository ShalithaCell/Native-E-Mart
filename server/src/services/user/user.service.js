const { User } = require("../../models");

const getUserFromDb = async (email, password) =>
{
    const data = await User.find({});

    console.log(data);

    return data;
};

module.exports = {
    getUserFromDb,
};
