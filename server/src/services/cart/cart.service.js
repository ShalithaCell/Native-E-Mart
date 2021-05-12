const { ObjectId } = require('mongoose').Types;

const { Cart } = require("../../models");
const { CartType } = require('../../types');
const ItemsService = require('../items/item.service');
const UserService = require('../user/user.service');

const CartService = {

    findById : async (id) =>
    {
        const data = await Cart.find({ _id: ObjectId(id) });

        return data;
    },
    findAll : async () =>
    {
        const data = await Cart.find({});

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
            const existingCart = await CartService.findById(request._id);

            console.log(`exists : ${existingCart}`);

            if (existingCart.length > 0) return null;

            // check item
            const item = await ItemsService.findByItemCode(request.itemCode);

            console.log(`item + ${item}`);

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
    update : async (cartData) =>
    {
        try
        {
            // check already exists
            // const existingItem = await ItemService.findById(ItemData._id);

            // console.log(`existingItem + ${existingItem}`);

            // if (existingItem.length < 1) return null;

            // const category = await CategoryService.findByName(ItemData.category);

            // console.log(`category + ${category[0]}`);

            // if (!category)
            // {
            //     return null;
            // }

            // const data = await Items.updateOne(
            //     { _id: ObjectId(ItemData._id) },
            //     {
            //         $set : {
            //             name        : ItemData.name,
            //             description : ItemData.description,
            //             itemCode    : ItemData.itemCode,
            //             buyPrice    : ItemData.buyPrice,
            //             sellPrice   : ItemData.sellPrice,
            //             weight      : ItemData.weight,
            //             quantity    : ItemData.quantity,
            //             img         : ItemData.img,
            //             category    : category[0]._id,
            //         },
            //     },
            // );
            //
            // return data;
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

        const data = await Cart.deleteOne({ _id: ObjectId(id) });

        // console.log(data);

        return data;
    },

};

module.exports = CartService;
