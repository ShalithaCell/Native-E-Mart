// General function for all ajax calls
function ajaxCall(callParams, dataParams, callback) {
    $.ajax({
        type: callParams.Type,
        url: callParams.Url,
        quietMillis: 100,
        dataType: callParams.DataType,
        data: dataParams,
        cache: true,
        complete: callback
    });
}
