function getAllItems()
{
    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "GET"; // GET type function
    ajaxCallParams.Url = GET_ALL_ITEMS; // Pass Complete end point Url
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

    let items;

    ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
    {
        console.log(result);
        console.log('inside');

        // check qpi request is success
        if (result.status === 200)
        {
            // fetch the data
            items = result.responseJSON;
            console.log(items.data);

            let temp = "";

            items.data.category.map((item) =>
            {
                console.log(item);
                temp += "<tr>";
                temp += `<td>${item.name}</td>`;
                temp += `<td>${item.description}</td>`;
                temp += `<td>${item.itemCode}</td>`;
                temp += `<td>${item.buyPrice}</td>`;
                temp += `<td>${item.sellPrice}</td>`;
                temp += `<td>${item.weight}</td>`;
                temp += `<td>${item.quantity}</td>`;
                temp += `<td>${item.category}</td>`;
                temp += `<td><button class="btn btn-warning" onClick=editCategory("${item._id}")>Edit</button></td>`;
                temp += `<td><button class="btn btn-danger" onClick=deleteCategory("${item._id}")>Delete</button></td></tr>`;
            });

            document.getElementById('itemData').innerHTML = temp;
        }
        else
        {
            console.log(result.status);
        }

        return items;
    });
}
function addItem()
{
    console.log('inside');

    $.confirm({
        title   : 'Add Items!',
        content : ''
            + '<form action="" class="formName">'
            + '<div class="form-group">'
            + '<label>Item Name</label>'
            + '<input type="text" placeholder="Item Name" class="itemName form-control" required />'
            + '</div>'
            + '<div class="form-group">'
            + '<label>Item description</label>'
            + '<input type="text" placeholder="Item description" class="itemDescription form-control" required />'
            + '</div>'
            + '<div class="form-group">'
            + '<label>Item Code</label>'
            + '<input type="text" placeholder="Item itemCode" class="itemCode form-control" required />'
            + '</div>'
            + '<div class="form-group">'
            + '<label>Item Buy Price</label>'
            + '<input type="number" placeholder="Item buyPrice" class="itemBuyPrice form-control" required />'
            + '</div>'
            + '<div class="form-group">'
            + '<label>Item Sell Price</label>'
            + '<input type="number" placeholder="Item sellPrice" class="itemSellPrice form-control" required />'
            + '</div>'
            + '<div class="form-group">'
            + '<label>Item Weight</label>'
            + '<input type="number" placeholder="Item weight" class="itemWeight form-control" required />'
            + '</div>'
            + '<div class="form-group">'
            + '<label>Item Quantity</label>'
            + '<input type="number" placeholder="Item quantity" class="itemQty form-control" required />'
            + '</div>'
            + '<div class="form-group">'
            + '<label>Item Img</label>'
            + '<input type="text" placeholder="Item img" class="itemImg form-control" required />'
            + '</div>'
            + '<div class="form-group">'
            + '<label>Item Category</label>'
            + '<input type="text" placeholder="Item category" class="itemCategory form-control" required />'
            + '</div>'
            + '</form>',
        buttons : {
            formSubmit : {
                text     : 'Submit',
                btnClass : 'btn-blue',
                action ()
                {
                    const name = this.$content.find('.itemName').val();
                    const description = this.$content.find('.itemDescription').val();
                    const itemCode = this.$content.find('.itemCode').val();
                    const buyPrice = this.$content.find('.itemBuyPrice').val();
                    const sellPrice = this.$content.find('.itemSellPrice').val();
                    const weight = this.$content.find('.itemWeight').val();
                    const quantity = this.$content.find('.itemQty').val();
                    const img = this.$content.find('.itemImg').val();
                    const category = this.$content.find('.itemCategory').val();

                    if (!name)
                    {
                        $.alert('provide a valid name');

                        return false;
                    }
                    else if (!description)
                    {
                        $.alert('provide a valid description');

                        return false;
                    }
                    else if (!itemCode)
                    {
                        $.alert('provide a valid itemCode');

                        return false;
                    }
                    else if (!buyPrice)
                    {
                        $.alert('provide a valid buyPrice');

                        return false;
                    }
                    else if (!sellPrice)
                    {
                        $.alert('provide a valid sellPrice');

                        return false;
                    }
                    else if (!weight)
                    {
                        $.alert('provide a valid weight');

                        return false;
                    }
                    else if (!quantity)
                    {
                        $.alert('provide a valid quantity');

                        return false;
                    }
                    else if (!img)
                    {
                        $.alert('provide a valid image');

                        return false;
                    }
                    else if (!category)
                    {
                        $.alert('provide a valid category');

                        return false;
                    }
                    else
                    {
                        const ajaxCallParam = {};
                        const ajaxDataParam = {};

                        ajaxCallParam.Type = "POST"; // GET type function
                        ajaxCallParam.Url = ADD_ITEM; // Pass Complete end point
                        ajaxCallParam.DataType = "JSON"; // Return data type e-g Html, Json etc

                        ajaxDataParam.name = name;
                        ajaxDataParam.description = description;
                        ajaxDataParam.itemCode = itemCode;
                        ajaxDataParam.buyPrice = buyPrice;
                        ajaxDataParam.sellPrice = sellPrice;
                        ajaxDataParam.quantity = quantity;
                        ajaxDataParam.weight = weight;
                        ajaxDataParam.img = img;
                        ajaxDataParam.category = category;

                        let items = '';

                        ajaxCall(ajaxCallParam, ajaxDataParam, (result, data, settings) =>
                        {
                            console.log(result);

                            // check qpi request is success
                            if (result.status === 200)
                            {
                                // fetch the data
                                items = result.responseJSON;
                                $.confirm({
                                    title   : '',
                                    content : 'Item added!',
                                    buttons : {
                                        OK()
                                        {
                                            window.location.href = '../../dashboard/items.html';
                                        },
                                    },
                                });
                            }
                            else if (result.status === 403)
                            {
                                $.confirm({
                                    title   : '',
                                    content : 'Error occured!',
                                    buttons : {
                                        OK()
                                        {
                                            window.location.href = '../../dashboard/items.html';
                                        },
                                    },
                                });
                            }
                            // return category;
                        });
                    }
                },
            },
            cancel()
            {
                // close
            },
        },
    });
}
function editItems(_id)
{
    console.log(_id);

    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "GET"; // GET type function
    ajaxCallParams.Url = GET_ITEM_BY_ID + `${_id}`; // Pass Complete end point
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

    let categories = '';

    ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
    {
        console.log(result);

        // check qpi request is success
        if (result.status === 200)
        {
            // fetch the data
            categories = result.responseJSON;
            console.log(categories.data);
        }
        else
        {
            console.log(result.status);
        }
        // return category;
    });

    $.confirm({
        title   : 'Edit Category!',
        content : ''
            + '<form action="" class="formName">'
            + '<div class="form-group">'
            + '<label>Category Name</label>'
            + '<input type="text" placeholder="Category Name" class="categoryName form-control" required />'
            + '</div>'
            + '</form>',
        buttons : {
            formSubmit : {
                text     : 'Submit',
                btnClass : 'btn-blue',
                action ()
                {
                    const name = this.$content.find('.categoryName').val();

                    if (!name)
                    {
                        $.alert('provide a valid name');

                        return false;
                    }
                    else
                    {
                        const ajaxCallParam = {};
                        const ajaxDataParam = {};

                        ajaxCallParam.Type = "PUT"; // GET type function
                        ajaxCallParam.Url = UPDATE_CATEGORY; // Pass Complete end point
                        ajaxCallParam.DataType = "JSON"; // Return data type e-g Html, Json etc

                        const categoryName = $('.categoryName').val();

                        ajaxDataParam._id = _id;
                        ajaxDataParam.name = categoryName;

                        ajaxCall(ajaxCallParam, ajaxDataParam, (result, data, settings) =>
                        {
                            console.log(result);

                            // check qpi request is success
                            if (result.status === 200)
                            {
                                // fetch the data
                                categories = result.responseJSON;
                                console.log(`update + ${categories.data}`);
                                $.confirm({
                                    title   : '',
                                    content : 'Category updated!',
                                    buttons : {
                                        ok()
                                        {
                                            window.location.href = '../../dashboard/items.html';
                                        },
                                    },
                                });
                            }
                            else
                            {
                                console.log(result.status);
                            }
                            // return category;
                        });
                    }
                },
            },
            cancel()
            {
                // close
            },
        },
        onContentReady()
        {
            // bind to events
            const jc = this;

            // categories.map((category) =>
            // {
            //     category.name = this.$content.find('.categoryName').val();
            // });
            console.log(categories.data.category[0]);

            this.$content.find('.categoryName').val(categories.data.category[0].name);

            this.$content.find('form').on('submit', (e) =>
            {
                // if the user submits the form by pressing enter in the field.
                e.preventDefault();
                jc.$$formSubmit.trigger('click'); // reference the button and click it
            });
        },
    });
}

function deleteItems(_id)
{
    console.log(_id);

    $.confirm({
        title   : 'Confirm!',
        content : 'Delete this Items?',
        buttons : {
            confirm()
            {
                const ajaxCallParams = {};
                const ajaxDataParams = {};

                ajaxCallParams.Type = "DELETE"; // GET type function
                ajaxCallParams.Url = DELETE_CATEGORY+`${_id}`; // Pass Complete end point Url e-g Payment Controller, Create Action
                ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

                ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
                {
                    // check qpi request is success
                    if (result.status === 200)
                    {
                        $.confirm({
                            title   : '',
                            content : 'Category Deleted!',
                            buttons : {
                                ok()
                                {
                                    window.location.href = '../../dashboard/category.html';
                                },
                            },
                        });
                    }
                    else if (result.status === 403)
                    {
                        // show the error message
                        $('.err-categoryName').removeClass('d-none').html(`${result.responseJSON.message}, ${result.responseJSON.data.message.message}`);
                    }
                    else if (result.status === 400)
                    {
                        // show the error message
                        $('.err-categoryName').removeClass('d-none').html(result.responseJSON.message);
                    }
                });
            },
            cancel()
            {
            },
        },
    });
}
