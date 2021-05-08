const fs = require('fs');
const path = require('path');
const RoleService = require('../userRole/userRole.service');
const UserService = require('../user/user.service');
const DeliveryService = require('../delivery/delivery.Service');

const ApplicationDataSeeder = {
    seedRoles : async () =>
    {
        fs.readFile(path.resolve('data/roles.json'), (err, data) =>
        {
            if (err) throw err;
            const roles = JSON.parse(data);

            roles.forEach((role) =>
            {
                RoleService.create(role);
            });
        });
    },
    seedUsers : async () =>
    {
        fs.readFile(path.resolve('data/users.json'), (err, data) =>
        {
            if (err) throw err;
            const users = JSON.parse(data);

            users.forEach((user) =>
            {
                const result = UserService.create(user);

                console.log(result);
            });
        });
    },
    seedDelivery : async () =>
    {
        fs.readFile(path.resolve('data/delivery.json'), (err, data) =>
        {
            if (err) throw err;
            const delivery = JSON.parse(data);

            delivery.forEach((delivery) =>
            {
                const result = DeliveryService.create(delivery);

                console.log(result);
            });
        });
    },
};

module.exports = ApplicationDataSeeder;
