const { ObjectId } = require('mongoose').Types;
const { Order } = require("../../models");
const { OrderType } = require('../../types');
const CartService = require('../cart/cart.service');
const ItemsService = require('../items/item.service');
const UserService = require('../user/user.service');

const OrderService = {

    findById : async (_id) =>
    {
        const data = await Order.find({ _id: ObjectId(_id) });

        return data;
    },
    findAll : async () =>
    {
        const data = await Order.find({});

        return data;
    },
    create : async (orderData) =>
    {
        try
        {
            // check data validation
            const request = Object.setPrototypeOf(orderData, OrderType.prototype);

            console.log("in service");

            if (!request.isValid())
            {
                return null;
            }
            // check already exists
            const existingOrder = await OrderService.findById(ObjectId(request._id));

            console.log(`exists : ${existingOrder}`);
            if (existingOrder.length > 0) return null;

            // check item
            const item = await ItemsService.findByItemCode(request.itemCode);

            console.log(item);

            if (!item)
            {
                return null;
            }

            // check user

            const user = await UserService.findByEmail(request.user);

            console.log(user);

            if (!user)
            {
                return null;
            }

            // check cart
            const cart = await CartService.findById(request.cart);

            console.log(cart);

            if (!cart)
            {
                return null;
            }

            const order = new Order({
                name            : request.name,
                qty             : request.qty,
                discount        : request.discount,
                shippingDetails : request.shippingDetails,
                total           : request.total,
                item            : item._id,
                user            : user._id,
                cart            : cart._id,
                isActive        : true,
            });

            console.log(order);

            // create order
            const data = await cart.save();

            console.log(data);

            return data;
        }
        catch (e)
        {
            console.log(e);
            throw e;
        }
    },

    deleteById : async (id) =>
    {
        // console.log(`in service + ${id}`);

        const data = await Order.deleteOne({ _id: ObjectId(id) });

        // console.log(data);

        return data;
    },
};

module.exports = OrderService;
