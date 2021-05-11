const { Delivery } = require("../../models");
const { DeliveryType } = require('../../types');

const DeliveryService = {
    find : async (name) =>
    {
        const data = await Delivery.findOne({ name });

        return data;
    },
    findByName : async (name) =>
    {
        const data = await Delivery.find().or({ name });

        return data;
    },
    findById : async (id) =>
    {
        const data = await Delivery.find().or({ id });

        return data;
    },
    create : async (deliveryData) =>
    {
        try
        {
            // check data validation
            const request = Object.setPrototypeOf(deliveryData, DeliveryType.prototype);

            console.log("in service");

            if (!request.isValid())
            {
                return null;
            }
            // check already exists
            const existingDelivery = await DeliveryService.findById(request.deliveryId);

            console.log(`exists : ${existingDelivery}`);
            if (existingDelivery.length > 0) return null;

            const delivery = new Delivery({
                deliveryId     : request.deliveryId,
                name           : request.name,
                address        : request.address,
                email          : request.email,
                phone          : request.phone,
                cashOnDelivery : request.cashOnDelivery,
                deliveryType   : request.deliveryType,
                costPerKm      : request.costPerKm,
                isActive       : true,
            });

            console.log(delivery);

            // create item
            const data = await delivery.save();

            console.log(data);

            return data;
        }
        catch (e)
        {
            console.log(e);
            throw e;
        }
    },
};

module.exports = DeliveryService;
