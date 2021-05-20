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
// function addItem()
// {
//     console.log('inside');

//     $.confirm({
//         title   : 'Add Items!',
//         content : ''
//             + '<form action="" class="formName">'
//             + '<div class="form-group">'
//             + '<label>Item Name</label>'
//             + '<input type="text" placeholder="Item Name" class="itemName form-control" required />'
//             + '</div>'
//             + '<div class="form-group">'
//             + '<label>Item description</label>'
//             + '<input type="text" placeholder="Item description" class="itemDescription form-control" required />'
//             + '</div>'
//             + '<div class="form-group">'
//             + '<label>Item Code</label>'
//             + '<input type="text" placeholder="Item itemCode" class="itemCode form-control" required />'
//             + '</div>'
//             + '<div class="form-group">'
//             + '<label>Item Buy Price</label>'
//             + '<input type="text" placeholder="Item buyPrice" class="itemBuyPrice form-control" required />'
//             + '</div>'
//             + '<div class="form-group">'
//             + '<label>Item Sell Price</label>'
//             + '<input type="text" placeholder="Item sellPrice" class="itemSellPrice form-control" required />'
//             + '</div>'
//             + '<div class="form-group">'
//             + '<label>Item Weight</label>'
//             + '<input type="text" placeholder="Item weight" class="itemWeight form-control" required />'
//             + '</div>'
//             + '<div class="form-group">'
//             + '<label>Item Quantity</label>'
//             + '<input type="text" placeholder="Item quantity" class="itemQty form-control" required />'
//             + '</div>'
//             + '<div class="form-group">'
//             + '<label>Item Img</label>'
//             + '<input type="text" placeholder="Item img" class="itemImg form-control" required />'
//             + '</div>'
//             + '<div class="form-group">'
//             + '<label>Item Category</label>'
//             + '<input type="text" placeholder="Item category" class="itemCategory form-control" required />'
//             + '</div>'
//             + '</form>',
//         buttons : {
//             formSubmit : {
//                 text     : 'Submit',
//                 btnClass : 'btn-blue',
//                 action ()
//                 {
//                     const name = this.$content.find('.categoryName').val();
//                     const description = this.$content.find('.categoryName').val();
//                     const itemCode = this.$content.find('.categoryName').val();
//                     const buyPrice = this.$content.find('.categoryName').val();
//                     const sellPrice = this.$content.find('.categoryName').val();
//                     const weight = this.$content.find('.categoryName').val();
//                     const quantity = this.$content.find('.categoryName').val();
//                     const img = this.$content.find('.categoryName').val();
//                     const category = this.$content.find('.categoryName').val();

//                     if (!name)
//                     {
//                         $.alert('provide a valid name');

//                         return false;
//                     }
//                     else
//                     {
//                         const ajaxCallParam = {};
//                         const ajaxDataParam = {};

//                         ajaxCallParam.Type = "PUT"; // GET type function
//                         ajaxCallParam.Url = UPDATE_CATEGORY; // Pass Complete end point
//                         ajaxCallParam.DataType = "JSON"; // Return data type e-g Html, Json etc

//                         const categoryName = $('.categoryName').val();

//                         ajaxDataParam._id = _id;
//                         ajaxDataParam.name = categoryName;

//                         ajaxCall(ajaxCallParam, ajaxDataParam, (result, data, settings) =>
//                         {
//                             console.log(result);

//                             // check qpi request is success
//                             if (result.status === 200)
//                             {
//                                 // fetch the data
//                                 categories = result.responseJSON;
//                                 console.log(`update + ${categories.data}`);
//                                 $.confirm({
//                                     title   : '',
//                                     content : 'Category updated!',
//                                     buttons : {
//                                         ok()
//                                         {
//                                             window.location.href = '../../dashboard/category.html';
//                                         },
//                                     },
//                                 });
//                             }
//                             else
//                             {
//                                 console.log(result.status);
//                             }
//                             // return category;
//                         });
//                     }
//                 },
//             },
//             cancel()
//             {
//                 // close
//             },
//         },
//     });

//     const categoryName = $('#category-name').val();

//     // check validations
//     if (categoryName.length <= 0)
//     {
//         $('.err-categoryName').removeClass('d-none');

//         return;
//     }
//     else
//     {
//         $('.err-categoryName').addClass('d-none');
//     }

//     // set the api call
//     const ajaxCallParams = {};
//     const ajaxDataParams = {};

//     ajaxCallParams.Type = "POST"; // POST type function
//     ajaxCallParams.Url = ADD_ITEM; // Pass Complete end point
//     ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

//     // Set Data parameters
//     ajaxDataParams.name = categoryName;

//     ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
//     {
//         // check qpi request is success
//         if (result.status === 200)
//         {
//             console.log("add category success");
//             window.location.href = '../../dashboard/category.html';
//         }
//         else if (result.status === 403)
//         {
//             // show the error message
//             $('.err-categoryName').removeClass('d-none').html(`${result.responseJSON.message}, ${result.responseJSON.data.message.message}`);
//         }
//         else if (result.status === 400)
//         {
//             // show the error message
//             $('.err-categoryName').removeClass('d-none').html(result.responseJSON.message);
//         }
//     });
// }
// function editItems(_id)
// {
//     console.log(_id);

//     const ajaxCallParams = {};
//     const ajaxDataParams = {};

//     ajaxCallParams.Type = "GET"; // GET type function
//     ajaxCallParams.Url = GET_CATEGORY_BY_ID + `${_id}`; // Pass Complete end point
//     ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

//     let categories = '';

//     ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
//     {
//         console.log(result);

//         // check qpi request is success
//         if (result.status === 200)
//         {
//             // fetch the data
//             categories = result.responseJSON;
//             console.log(categories.data);
//         }
//         else
//         {
//             console.log(result.status);
//         }
//         // return category;
//     });

//     $.confirm({
//         title   : 'Edit Category!',
//         content : ''
//             + '<form action="" class="formName">'
//             + '<div class="form-group">'
//             + '<label>Category Name</label>'
//             + '<input type="text" placeholder="Category Name" class="categoryName form-control" required />'
//             + '</div>'
//             + '</form>',
//         buttons : {
//             formSubmit : {
//                 text     : 'Submit',
//                 btnClass : 'btn-blue',
//                 action () {
//                     const name = this.$content.find('.categoryName').val();

//                     if (!name)
//                     {
//                         $.alert('provide a valid name');

//                         return false;
//                     }
//                     else
//                     {
//                         const ajaxCallParam = {};
//                         const ajaxDataParam = {};

//                         ajaxCallParam.Type = "PUT"; // GET type function
//                         ajaxCallParam.Url = UPDATE_CATEGORY; // Pass Complete end point
//                         ajaxCallParam.DataType = "JSON"; // Return data type e-g Html, Json etc

//                         const categoryName = $('.categoryName').val();

//                         ajaxDataParam._id = _id;
//                         ajaxDataParam.name = categoryName;

//                         ajaxCall(ajaxCallParam, ajaxDataParam, (result, data, settings) =>
//                         {
//                             console.log(result);

//                             // check qpi request is success
//                             if (result.status === 200)
//                             {
//                                 // fetch the data
//                                 categories = result.responseJSON;
//                                 console.log(`update + ${categories.data}`);
//                                 $.confirm({
//                                     title   : '',
//                                     content : 'Category updated!',
//                                     buttons : {
//                                         ok()
//                                         {
//                                             window.location.href = '../../dashboard/category.html';
//                                         },
//                                     },
//                                 });
//                             }
//                             else
//                             {
//                                 console.log(result.status);
//                             }
//                             // return category;
//                         });
//                     }
//                 },
//             },
//             cancel()
//             {
//                 // close
//             },
//         },
//         onContentReady()
//         {
//             // bind to events
//             const jc = this;

//             // categories.map((category) =>
//             // {
//             //     category.name = this.$content.find('.categoryName').val();
//             // });
//             console.log(categories.data.category[0]);

//             this.$content.find('.categoryName').val(categories.data.category[0].name);

//             this.$content.find('form').on('submit', (e) =>
//             {
//                 // if the user submits the form by pressing enter in the field.
//                 e.preventDefault();
//                 jc.$$formSubmit.trigger('click'); // reference the button and click it
//             });
//         },
//     });
// }

// function deleteItems(_id)
// {
//     console.log(_id);

//     $.confirm({
//         title   : 'Confirm!',
//         content : 'Delete this Items?',
//         buttons : {
//             confirm()
//             {
//                 const ajaxCallParams = {};
//                 const ajaxDataParams = {};

//                 ajaxCallParams.Type = "DELETE"; // GET type function
//                 ajaxCallParams.Url = DELETE_CATEGORY+`${_id}`; // Pass Complete end point Url e-g Payment Controller, Create Action
//                 ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

//                 ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
//                 {
//                     // check qpi request is success
//                     if (result.status === 200)
//                     {
//                         $.confirm({
//                             title   : '',
//                             content : 'Category Deleted!',
//                             buttons : {
//                                 ok()
//                                 {
//                                     window.location.href = '../../dashboard/category.html';
//                                 },
//                             },
//                         });
//                     }
//                     else if (result.status === 403)
//                     {
//                         // show the error message
//                         $('.err-categoryName').removeClass('d-none').html(`${result.responseJSON.message}, ${result.responseJSON.data.message.message}`);
//                     }
//                     else if (result.status === 400)
//                     {
//                         // show the error message
//                         $('.err-categoryName').removeClass('d-none').html(result.responseJSON.message);
//                     }
//                 });
//             },
//             cancel()
//             {
//             },
//         },
//     });
// }
