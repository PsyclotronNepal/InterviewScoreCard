import * as toastr from 'toastr';

export var appInstance=null;
export var active=1;
export var loggedinUser={loggedin: false};
var pages={}
export function addPage(name,_function){
    pages[name]=_function;
}
export function setPage(page){
    appInstance.changeRenderer(page);
}

export function setAppInstance(app){
    appInstance = app;
}

export function changeUser(user){
    loggedinUser = user;
}
export function pageUser(){
    return loggedinUser;
}
export function setActiveNavItem(ac){
    active=ac;
}
export function getActiveNavItem(){
    return active;
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

export function makeEditable(component){
    component.innerHTML='<input value="'+component.innerHTML+'" />';
}