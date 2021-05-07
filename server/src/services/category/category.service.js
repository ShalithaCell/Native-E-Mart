const { Category } = require("../../models");
const { CategoryType } = require('../../types');


const CategoryService = {
    findByName : async (categoryData) =>
    {
        const request = Object.setPrototypeOf(categoryData, CategoryType.prototype);
        const data = await Category.find().or([{ name: request.name }])

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
                isActive : true
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
