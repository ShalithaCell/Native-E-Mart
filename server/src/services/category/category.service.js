const { Category } = require("../../models");
const { CategoryType } = require('../../types');

const CategoryService = {
    find : async (name) =>
    {
        const data = await Category.findOne({ name });

        return data;
    },
    findByName : async (name) =>
    {
        const data = await Category.find().or({ name });

        return data;
    },
    findById : async (id) =>
    {
        const data = await Category.find().or({ id });

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
};

module.exports = CategoryService;
