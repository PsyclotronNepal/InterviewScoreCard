var appInstance=null;
var loggedinUser={loggedin: false};
var pages={}
function addPage(name,_function){
    pages[name]=_function;
}
function setPage(page){
    appInstance.changeRenderer(page);
}

function changeUser(user){
    loggedinUser=user;
}
function pageUser(){
    return loggedinUser;
}

$.ajax({
    dataType: "json",
    url: "/api/user",
    success: function (result) {
        loggedinUser=result;
    },
    error:function(err){
        toastr['error'](" Message: " + err.responseJSON.message,"User Login error [code: " + err.status+"]" );
    },
    async:false
});