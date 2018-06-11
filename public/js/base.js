function getJson(url,data,success,failure){
    return $.ajax({
        dataType: "json",
        url: url,
        data: data,
        success: success

    })

}