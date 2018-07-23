<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use App\User;

class HrController extends Controller
{
    //
    function getList(Request $request){
        if ($request->term) {
            return $this->searchHr($request);
        }


        $interviewers = User::whereHas('roles', function ($query) {
            $query->where('name', '=', 'admin');
        })->get();

        return $interviewers;
    }


    function searchHr(Request $request){
        $interviewers = User::whereHas('roles', function ($query) {
            $query->where('name', '=', 'admin');
        })->where('first_name', 'like', '%' . $request->term . '%')->get();

        return $interviewers;

    }

    function deleteHr(Request $request, $adminId){
        $admin = User::whereHas('roles', function ($query) {
            $query->where('name', '=', 'admin');
        })->find($adminId);
        $admin->delete();

        return $this->getList($request);

    }

    function get(Request $request, $adminId){
        $admin = User::whereHas('roles', function ($query) {
            $query->where('name', '=', 'admin');
        })->find($adminId);
        return $admin;

    }
    function update(Request $request){
        $admin=User::find($request->id);
        if($admin->isAdmin()){
            $admin->fill($request->all(['first_name','last_name','middle_name','email'  ]));
            $admin->save();
            return ["success"=>true];
        }
        else{
            return  ["error" => true, "message" => "User is not an Admin"];
        }
    }
}
