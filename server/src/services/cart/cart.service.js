const mongoose = require("mongoose");
const { Cart } = require("../../models");
const { CartType } = require('../../types');
const ItemsService = require('../items/item.service');
const UserService = require('../user/user.service');

const ObjectId = mongoose.Types.ObjectId();

const CartService = {

    findById : async (_id) =>
    {
        const data = await Cart.findOne({ _id });

        return data;
    },
    create : async (cartData) =>
    {
        try
        {
            // check data validation
            const request = Object.setPrototypeOf(cartData, CartType.prototype);

            console.log("in service");

            if (!request.isValid())
            {
                return null;
            }
            // check already exists
            const existingCart = await CartService.findById(ObjectId(request._id));

            console.log(`exists : ${existingCart}`);
            if (existingCart.length > 0) return null;

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

            const cart = new Cart({
                name     : request.name,
                item     : item._id,
                user     : user._id,
                isActive : true,
            });

            console.log(cart);

            // create cart
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
};

module.exports = CartService;
