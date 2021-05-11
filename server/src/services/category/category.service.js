const { ObjectId } = require('mongoose').Types;
const { Category } = require("../../models");
const { CategoryType } = require('../../types');

const CategoryService = {
    find : async (name) =>
    {
        const data = await Category.findOne({ name });

        return data;
    },
    findAll : async () =>
    {
        const data = await Category.find({});

        return data;
    },
    findByName : async (name) =>
    {
        const data = await Category.find().or({ name });

        return data;
    },
    findById : async (id) =>
    {
        console.log(`in service + ${id}`);

        const data = await Category.findOne({ _id: ObjectId(id) });

        console.log(`data: ${data}`);

        return data;
    },
    create : async (categoryData) =>
    {
        try
        {
            // check data validation
            const request = Object.setPrototypeOf(categoryData, CategoryType.prototype);

            console.log(request);

            if (!request.isValid())
            {
                return null;
            }
            // check already exists
            const existingCategory = await CategoryService.findByName(request.name);

            console.log(existingCategory);
            if (existingCategory.length > 0) return null;

            const category = new Category({
                name     : request.name,
                isActive : true,
            });

            console.log(category);

            // create category
            const data = await category.save();

            console.log(data);

            return data;
        }
        catch (e)
        {
            console.log(e);
            throw e;
        }
    },

    update : async (categoryData) =>
    {
        try
        {
            // check data validation

            // if (!request.isValid())
            // {
            //     return null;
            // }
            // check already exists
            const existingCategory = await CategoryService.findByName(categoryData.name);

            console.log(existingCategory);
            if (existingCategory.length > 0) return null;

            const data = await Category.update(
                { _id: 1 },
                {
                    $set : {
                        // item             : "ABC123",
                        // "info.publisher" : "2222",
                        // tags             : [ "software" ],
                        // "ratings.1"      : { by: "xyz", rating: 3 },
                    },
                },
            );

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
        console.log(`in service + ${id}`);

        const data = await Category.deleteOne({ _id: ObjectId(id) });

        console.log(data);

        return data;
    },
};

module.exports = CategoryService;
